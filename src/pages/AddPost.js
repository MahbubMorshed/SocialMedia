import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import { toast } from "react-toastify";

function AddPost() {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addPost = () => {
    dispatch({ type: "showLoading" });
    const storage = getStorage();
    const storageRef = ref(storage, `/posts/${image.name}`);
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(ref(storage, `/posts/${image.name}`)).then((url) => {
          addDoc(collection(fireDb, "posts"), {
            description,
            imageURL: url,
            likes: [],
            comments: [],
            user: JSON.parse(localStorage.getItem("mushfiqeen-user")),
          })
            .then(() => {
              toast.success("Post created successfully");
              dispatch({ type: "hideLoading" });
              navigate("/");
            })
            .catch(() => {
              dispatch({ type: "hideLoading" });
              toast.error("Something went wrong");
            });
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error uploading");
      });
  };

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <DefaultLayout>
      <div>
        <h1 className="text-3xl  text-gray-600">Add New Post</h1>

        <div className="w-screen flex flex-col">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-dashed border-gray-500 border-2 w-1/2 md:w-full my-5 p-5"
            rows="3"
          ></textarea>

          <input type="file" onChange={(e) => onImageChange(e)} />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="mt-5 h-52 w-52 rounded"
            />
          )}
        </div>

        {description && image && (
          <button
            className="bg-primary h-10 rounded-sm text-white px-10 mt-10"
            onClick={addPost}
          >
            Add
          </button>
        )}
      </div>
    </DefaultLayout>
  );
}

export default AddPost;
