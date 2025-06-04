import React, { useState } from 'react';
import { Card, Table } from 'react-bootstrap';

import useUtility from '@/app/_hooks/useUtility';
import { showDateTime } from '@/lib/helpers';
import ArticleSubmitForm from './ArticleSubmitForm';
import VideoUploadForm from './VideoUploadForm';
import ResourceUploadForm from './ResourceUploadForm';
import useContentHandler from '../../_hooks/useContentHandler';
import { confirmAlert } from 'react-confirm-alert';
import Link from 'next/link';

const LectureContent = ({ lecture, replaceVideo, slug, onCancel, onReplace }) => {
  const { trans } = useUtility();
  const [showResources, setResources] = useState(false);

  const toggleResources = (lectureId) => {
    setResources(showResources === lectureId ? null : lectureId);
  };

  const { handleDeleteResource,resourcesDownload } = useContentHandler(slug)


  const deleteResource = (resourceId) => {
    setTimeout(() => {
      confirmAlert({
        title: 'Are you sure you want to delete this resource?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => handleDeleteResource(resourceId)
          },
          {
            label: 'No'
          }
        ]
      });
    }, 0);
  };


  return (
    <div className="video-table">
      {lecture?.content_type === 1 && !showResources && replaceVideo !== lecture?.id && (
        <>
          <div className='responsive--table'>
            <Table>
              <thead>
                <tr>
                  <th>{trans('Filename')}</th>
                  <th>{trans('Type')}</th>
                  <th>{trans('Date')}</th>
                  <th>{trans('Action')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{lecture?.file}</td>
                  <td>{trans('Video')}</td>
                  <td>{showDateTime(lecture?.created_at, 'DD MMM YYYY')}</td>
                  <td>
                    <button className="new--btn" type="button" onClick={onReplace}>
                      {trans('Replace')}
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="form-group mt-3 ms-3">
            <button type="button" className="save--btn" onClick={() => toggleResources(lecture?.id)}>
              {trans('Add Resources')}
            </button>
          </div>
        </>
      )}


      {replaceVideo && lecture?.content_type === 1 && replaceVideo === lecture?.id && (
        <div className="course-lecture-file">
          <div className="course-lecture-file-title">
            <span className="text">{trans('Upload Content File')}</span>
            <button type="button" onClick={onCancel} className="cross-icon">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <VideoUploadForm lecture={lecture} slug={slug} onCancel={onCancel} />
        </div>
      )}


      {showResources === lecture?.id && (
        <div className="course-lecture-file">
          <div className="course-lecture-file-title">
            <span className="text">{trans('Upload Resource File')}</span>
            <button type="button" onClick={() => toggleResources(lecture?.id)} className="cross-icon">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <ResourceUploadForm lecture={lecture} slug={slug} onCancel={() => toggleResources(lecture?.id)} />
        </div>
      )}


      {lecture?.content_type === 2 && !showResources && replaceVideo !== lecture?.id ? (
        <>
          <div className="course-lecture-file">
            <div className="article-wrapper">
              <div className="flex-align gap-3 flex-nowrap">
                <div className="file-icon">
                  <i className="las la-file"></i>
                </div>
                <div>
                  <button className='flex-align gap-2' type="button" onClick={onReplace}>
                    {trans('Edit Content')}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-file-pen-line"
                    >
                      <path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                      <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                      <path d="M8 18h1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group mb-0">
              <button type="button" className="save--btn" onClick={() => toggleResources(lecture?.id)}>
                {trans('Add Resources')}
              </button>
            </div>
          </div>

        </>
      ) : (
        lecture?.content_type === 2 && !showResources && (
          <div className="course-lecture-file">
            <div className="course-lecture-file-title">
              <span className="text">{trans('Edit Article Content')}</span>
              <button type="button" onClick={onCancel} className="cross-icon">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <ArticleSubmitForm lecture={lecture} onCancel={onCancel} slug={slug} />
          </div>
        )
      )}



      {lecture?.resources && lecture?.resources.length > 0 && (
        <div className='course-lecture-file'>
          <div className="mb-2">
            <label className='form-label form--label'>{trans('Downloadable materials')}</label>
          </div>
          {lecture?.resources.map((resource, index) => (
            <div key={index} className="resource-wrapper">

              <div className="flex-between gap-3">
                <Link href='javascript:void(0)' onClick={() => resourcesDownload(resource?.id)}  className='text-muted'>{resource?.file}</Link>

                <div className="flex-align gap-3 flex-nowrap">
                  <button type='button' onClick={() => resourcesDownload(resource?.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                  </button>

                  <button onClick={() => deleteResource(resource?.id)} type="button" className="course-action-btn"><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></span></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default LectureContent;
