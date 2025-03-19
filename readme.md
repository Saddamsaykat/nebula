echo "# nebula" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Saddamsaykat/nebula.git
git push -u origin main


firebase login
firebase init
firebase deploy


// ImageBB upload API key and endpoint
// const iamge_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${iamge_hosting_key}`

// let imageUrl: string = "";
          // Upload image to ImageBB if there's an image file
      // if (image && image instanceof File) {
      //   // const imageFormData = new FormData();
      //   formData.append("image", image);

      //   const imageUploadResponse = await fetch(image_hosting_api, {
      //     method: "POST",
      //     body: formData,
      //   });

      //   const imageUploadData = await imageUploadResponse.json();
      //   console.log(imageUploadData);
      //   if (imageUploadData.success) {
      //     imageUrl = imageUploadData.data.url;
      //   } else {
      //     throw new Error("Image upload failed");
      //   }
      // } else {
      //   console.error("No valid image file found");
      // }

       // imageUrl: imageUrl || "",



       // Function to generate a random ID


<!-- Token Generator -->

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"