
import { getCourseDetails, notifyToast, request } from '@/lib/helpers';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/lib/endpoints';
import { object, string } from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCourseData } from '@/store/courseSlice';


const useCourseHandler = (slug = null) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [successResponse, setSuccessResponse] = useState(false);
    const router = useRouter();
    const [editLecture, setEditLecture] = useState(false);
    const [currentWrapper, setCurrentWrapper] = useState(null);
    const [currentWrapperContent, setCurrentWrapperContent] = useState(null);


    const [videoDocument, setVideoDocument] = useState(null);

    const initialValues = {
        title: '',
        slug: ''
    };

    const validationSchema = object().shape({
        title: string().required('Title is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const { data } = await request.post(ENDPOINTS.CREATE_COURSE, values);
            if (data.status === 'error') return notifyToast(data);
            resetForm();
            router.push('/instructor/course/intended-learners/' + data.data.course.slug);
        } finally {
            setLoading(false);
        }

    };


    const initialSectionValues = {
        title: '',
        learning_object: '',
        section_id: '',
    };

    const sectionValidationSchema = object().shape({
        title: string().required('Title is required'),
        learning_object: string().optional(),
    });

    const handleSectionSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const { data } = await request.post(ENDPOINTS.ADD_SECTION + '/' + slug, values);

            if (data.status === 'error') return notifyToast(data);

            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            setSuccessResponse(true)

            resetForm();


        } finally {

            setLoading(false);
        }
    }

    const initialLectureValues = {
        title: '',
        section_id: '',
        is_preview: '',
    };
    const lectureValidationSchema = object().shape({
        title: string().required('Lecture Title is required'),
        section_id: string().required('Section is required'),

    });

    const handleLectureSubmit = async (values, { resetForm }) => {
        setLoading(true);

        try {
            const { data } = await request.post(`${ENDPOINTS.ADD_LECTURE}/${slug}`, values);

            if (data.status === 'error') {
                notifyToast(data);
                return;
            }

            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            setEditLecture(false);
            resetForm();


        } catch (error) {

            toast.error('Failed to create the lecture. Please try again.');
        } finally {
            setLoading(false);
            setCurrentWrapperContent(null);

            setCurrentWrapper(null);
        }
    };



    const initialLectureVideoValues = {
        section_id: '',
        lecture_id: '',
        video_file: '',
        // video_duration: '',
    };

    const lectureVideoValidationSchema = object().shape({
        section_id: string().required('Section id required'),
        lecture_id: string().required('Lecture id required'),
        video_file: string().required('Video is required'),


    });


    const handleLectureVideoSubmit = async (values, { resetForm }) => {

        setLoading(true);

        try {


            const video = videoDocument;
            let formattedDuration = null;
            video.src = URL.createObjectURL(values.video_file);

            video.onloadedmetadata = async () => {
                setLoading(true);
                const durationInSeconds = await video.duration;

                const hours = Math.floor(durationInSeconds / 3600);
                const minutes = Math.floor((durationInSeconds % 3600) / 60);
                const seconds = Math.floor(durationInSeconds % 60);

                formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            };

            setTimeout(async () => {
                const formData = new FormData();
                formData.append("video_file", values.video_file);
                formData.append("section_id", values.section_id);
                formData.append("lecture_id", values.lecture_id);
                formData.append("video_duration", formattedDuration);


                const { data } = await request.post(`${ENDPOINTS.ADD_LECTURE_VIDEO}/${slug}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (data.status === "error") return notifyToast(data);

                const course = await getCourseDetails(slug);
                dispatch(setCourseData(course));
                setSuccessResponse(true)
                resetForm();
            }, 500)

        } finally {
            setLoading(false);
        }
    };


    const initialArticleValues = {
        section_id: '',
        lecture_id: '',
        article: '',
    };

    const lectureArticleValidationSchema = object().shape({
        section_id: string().required('Section id required'),
        lecture_id: string().required('Lecture id required'),
        article: string().required('Artical is required')

    });


    const handleArticleSubmit = async (values, { resetForm }) => {

        setLoading(true);
        try {
            const { data } = await request.post(ENDPOINTS.ADD_LECTURE_ARTICLE + '/' + slug, values);
            if (data.status === "error") return notifyToast(data);
            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            setSuccessResponse(true)
            resetForm();

        } finally {
            setLoading(false);
        }
    };


    const sectionDelete = async (sectionId) => {
        try {

            const { data } = await request.get(ENDPOINTS.SECTION_DELETE + '/' + sectionId);


            if (data.status === "error") return notifyToast(data);
            const course = await getCourseDetails(slug);

            dispatch(setCourseData(course));
            notifyToast(data);

            return data;

        } catch (error) {
            console.error('Error closing ticket:', error);
            toast.error('An error occurred while deletig your section');
        }
    }


    const lectureDelete = async (lectureId) => {
        try {

            const { data } = await request.get(ENDPOINTS.LECTURE_DELETE + '/' + lectureId);

            const course = await getCourseDetails(slug);

            dispatch(setCourseData(course));

            notifyToast(data);
            return data;
        } catch (error) {
            console.error('Error closing ticket:', error);
            toast.error('An error occurred while deletig your lecture');
        }
    }




    const initialResourcesValues = {
        resources: null,  // Make sure this exists
        section_id: '',
        lecture_id: ''
    };


    const resourcesVideoValidationSchema = object().shape({
        section_id: string().required('Section id required'),
        lecture_id: string().required('Lecture id required'),
        resources: string().required('Resources is required')

    });


    const handleResourcesSubmit = async (values, { resetForm }) => {

        setLoading(true);



        try {
            const formData = new FormData();
            formData.append("resources", values.resources);
            formData.append("section_id", values.section_id);
            formData.append("lecture_id", values.lecture_id);

            const { data } = await request.post(`${ENDPOINTS.ADD_RESOURCES}/${slug}`, formData);


            if (data.status === "error") return notifyToast(data);

            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            setSuccessResponse(true)
            resetForm();
            toast.success('Resources saved successfully.');

        } finally {
            setLoading(false);
        }
    };



    const submitCourse = async () => {
        try {

            const { data } = await request.post(ENDPOINTS.SUBMIT_COURSE + '/' + slug);

            if (data.status === "error") return notifyToast(data);

            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            toast.success('Course submitted successfully.');
            router.push('/instructor/course/list');

        } catch (error) {
            console.error('Error closing ticket:', error);
            toast.error('An error occurred while deletig your lecture');
        }
    }




    return {
        initialValues,
        validationSchema,
        handleSubmit,
        initialSectionValues,
        sectionValidationSchema,
        handleSectionSubmit,
        initialLectureValues,
        lectureValidationSchema,
        handleLectureSubmit,
        initialLectureVideoValues,
        lectureVideoValidationSchema,
        handleLectureVideoSubmit,
        initialArticleValues,
        lectureArticleValidationSchema,
        handleArticleSubmit,
        initialResourcesValues,
        resourcesVideoValidationSchema,
        handleResourcesSubmit,
        successResponse,
        setSuccessResponse,
        sectionDelete,
        loading,
        setLoading,
        lectureDelete,
        submitCourse,


        editLecture,
        setEditLecture,
        setVideoDocument,
        currentWrapperContent, setCurrentWrapperContent,
        currentWrapper, setCurrentWrapper


    };
}

export default useCourseHandler;