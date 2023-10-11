import { FC,useState } from "react";
import { useQuery } from "../../hooks/useQuery";
import { Advertisement } from "../../types/advertisement";
import AdvertisementContent from "./AdvertisementContent";
import {useParams} from "react-router-dom";


const AdvertisementContainer: FC = () => {
    const {id} = useParams();
    const {data,error} = useQuery<Advertisement>("api/advertisements/"+id)

    if(data){
        return <AdvertisementContent data={data}/>
    }
    else {
        return <p>{error}</p>;
    }

};

export default AdvertisementContainer;