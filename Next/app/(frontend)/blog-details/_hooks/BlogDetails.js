import ENDPOINTS from "@/lib/endpoints";
import {  request } from "@/lib/helpers";



export async function getBlogDetails({ slug }) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const { data } = await request.get(`${baseUrl + ENDPOINTS.BLOG_DETAILS}/${slug}`);

    if (data.status == 'error') {
      return data;
    }

    return data.data;
  } catch (error) {
    return "Error fetching blog details";
  }
}
