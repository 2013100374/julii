import { getSEO, getTitle, request } from "@/lib/helpers";
import PolicyContent from "./_components/PolicyContent";
import ENDPOINTS from "@/lib/endpoints";
import NotFound from "@/app/not-found";
import { notFound } from "next/navigation";

const policyData = async (slug) => {
    const getPolicy = async (slug) => {
        const { data } = await request.get(`${ENDPOINTS.POLICY}/${slug}`);
        return data;
    }

    const policy = await getPolicy(slug);
    return policy;
}

export async function generateMetadata(props) {
    const params = await props.params;
    const { slug } = params;
    const policy = await policyData(slug);
    if (policy.remark == 'policy_not_found') {
        return notFound();
    }
    const seo = await getSEO({
        title: getTitle(policy.data.policy.data_values.title),
        description: policy.data.seo_content?.description,
        keywords: policy.data.seo_content?.keywords,
        image: policy.data.seo_image,
    });
    return seo;
}

export default async function PolicyPage(props) {
    const params = await props.params;
    const { slug } = params;
    const policy = await policyData(slug);
    if (policy.remark == 'policy_not_found') {
        return NotFound();
    }
    return (
        <>
            <div className="page-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <PolicyContent policy={policy.data.policy.data_values} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
