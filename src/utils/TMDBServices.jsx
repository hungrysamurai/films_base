import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

const useTMDBService = () => {
 const {request} = useFetch();

 const [mediaType,setMediaType] = useState('movie')



 return {

 }
}