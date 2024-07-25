"use client"

import { ShowmoreProps } from "@/types";
import { useRouter } from "next/navigation"
import { CustomButton } from ".";
import { updateSearchParams } from "@/util";


const ShowMore = ({ pageNumber, isNext}: ShowmoreProps ) => {
    const router = useRouter()
    const handleNavigation = () => {
        // increase the limit
        const newLimit = (pageNumber + 1) * 10
        // update the limit
        const newPathName = updateSearchParams("limit", `${newLimit}`)
        router.push(newPathName)
    }
  return (
    <div className="w-full flex-center gap-5 mt-10">
        {!isNext && (
            <CustomButton 
                title="Show more"
                btnType="button"
                containerStyles="bg-primary-blue rounded-full text-white"
                handleClick={handleNavigation}
                />
        )}

    </div>
  )
}

export default ShowMore