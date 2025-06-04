import React from "react";
import View from "../_component/View";
import { getMetaTitle } from "@/lib/helpers";
import { notFound } from "next/navigation";

export const metadata = getMetaTitle('Quiz');


export default async function page(props) {
  const params = await props.params;
  const { quiz_id } = params;

  


  return <View quizId={quiz_id} />;
}
