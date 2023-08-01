import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Email = () => {
  const [allConvertedFiles, setAllConvertedFiles] = useState([]);

  const convertFile = (event) => {
    const file = event.target.files[event.target.files.length - 1];
    const reader = new FileReader();

    reader.onload = () => {
      const dataUri = "data:" + file.type + ";base64," + btoa(reader.result);
      setAllConvertedFiles((prevFiles) => [
        ...prevFiles,
        { name: file.name, data: dataUri },
      ]);
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (allConvertedFiles.length > 0 && window.Email) {
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username: "erofetishgear@gmail.com",
        Password: "97B24D1B167641A2B5B2E7298A7C13080107",
        To: "erofetishgear@duck.com",
        From: "erofetishgear@gmail.com",
        Subject: "Payment deposit receipt from erofetishgear ",
        Body: "bodyContent",
        Port: 2525,
        Attachments: allConvertedFiles,
      }).then((message) => console.log(message));
      toast.dark("Response received");
      setAllConvertedFiles([]);
    } else {
      toast.error("kindly upload the transaction receipt");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/,video/,.jpg,.png,.pdf,.txt,,.hiec,.heif,.odp,.odf,.docx'
          name='fichiersSupp'
          id='fileInput'
          onChange={convertFile}
        />
        <Button type='submit'>Send</Button>
      </form>
    </div>
  );
};

export default Email;
