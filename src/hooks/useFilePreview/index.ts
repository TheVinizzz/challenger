import { useEffect, useState } from "react";

 const useFilePreview = (file: any) => {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (file && file[0]) {
      const newUrl: any = URL.createObjectURL(file[0]);

      if (newUrl !== imgSrc) {
        setImgSrc(newUrl);
      }
    }
  }, [file]);

  return [imgSrc, setImgSrc];
}

export default useFilePreview
