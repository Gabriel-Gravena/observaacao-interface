import { ServerRequestDetailsView } from "@/components/features/servidor/server-request-details-view"
export default async function Page({params}:{params:Promise<{id:string}>}){const{id}=await params;return <ServerRequestDetailsView id={id}/>}
