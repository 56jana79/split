import React from 'react'
import html2canvas from "html2canvas";

const ShareButton = ({containerId}) => {

  let handleShare  = async ()=>{

      const container = document.getElementById(containerId);
     if(!container)
     {
        return alert("container not found!")
     }

    try{
        const canvas = await html2canvas(container ,
            {
                useCORS:true ,
                scale:2
            }
        );

        // this line used to convert the canvas to blob mean an image
     const blob = await new Promise((resolve)=> canvas.toBlob(resolve , "image/png"))
     const file = new File([blob] , "split-details.png" , {type:"image/png"});

      // check if the browser supports image sharing

     if(navigator.canShare && navigator.canShare({files:[file]}))
     {
        await navigator.share(
            {
                files:[file] , 
                title:"My split details" ,
                text:"Here the bill split results!"
            }
        )
       
     } 
      else
        {
          //fallback : download image if sharing not supported
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a");
          link.href = url;
          link.download = "split-details.png" ,
          link.click();
          alert("Sharing not supported on this browser . Image downloaded instead")

        }

    } catch(error)
    {
        console.log("Error sharing image:" , error);
        alert("Failed to share the image");
    }

}

  return (
    <button onClick={handleShare} style={{cursor:"pointer"}} >
        share
        </button>
  )
}

export default ShareButton
