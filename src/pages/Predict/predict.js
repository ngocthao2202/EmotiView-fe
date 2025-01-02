"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from './predict.module.css';
import UploadFile from "../../components/UploadFile/uploadFile";
import bg from './../../assets/bg.png';
import { emotions } from './../../utilis/results';
import axios from 'axios';
import Loading from "../../components/Loading/loading";
import nodata from './../../assets/nodata.png';

// import {
//   Box,
//   Button,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Grid,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
// } from "@mui/material";

const Predict = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const response = await axios.post("https://e4fb-34-148-49-15.ngrok-free.app/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("API Response:", response.data);

      // Lưu kết quả dự đoán
      setPrediction(response.data);
      setError(false);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Tìm kết quả dựa trên prediction.label
  const result = emotions.find((val) => val.label === prediction?.Label);

  // Kiểm tra xem có lỗi không
  if (!result && prediction) {
    console.error(`No matching result for label: ${prediction.label}`);
  }

  // Log thông tin kiểm tra
  console.log("Prediction object:", prediction);
  console.log("Matching result:", result);

  // Hàm để làm lại
  const retry = () => {
    setFile(null);
    setPrediction(null);
    setError(false);
  };
  // return (
  //   <Box
  //     sx={{
  //       backgroundImage: `url(${bg})`,
  //       backgroundSize: "cover",
  //       minHeight: "100vh",
  //       p: 4,
  //       display: "flex",
  //       flexDirection: "column",
  //       alignItems: "center",
  //       justifyContent: "center",
  //     }}
  //   >
  //     {loading ? (
  //       <CircularProgress />
  //     ) : prediction ? (
  //       <Card sx={{ maxWidth: 600, p: 2, boxShadow: 3 }}>
  //         <CardMedia
  //           component="img"
  //           image={URL.createObjectURL(file)}
  //           alt="Uploaded image"
  //           sx={{ borderRadius: 2 }}
  //         />
  //         <CardContent>
  //           <Typography variant="h5" gutterBottom>
  //             Prediction Result
  //           </Typography>
  //           <Divider sx={{ my: 2 }} />
  //           <Typography variant="body1">
  //             <strong>Diagnosed:</strong> {result?.label || "N/A"}
  //           </Typography>
  //           <Typography variant="body1" sx={{ mt: 1 }}>
  //             <strong>Quote for you:</strong> {result?.quote || "N/A"}
  //           </Typography>
  //           <Divider sx={{ my: 2 }} />
  //           {result?.content && (
  //             <>
  //               <Typography variant="h6" sx={{ mb: 1 }}>
  //                 Suggested Musics:
  //               </Typography>
  //               <List>
  //                 {result.content.music?.map((music, idx) => (
  //                   <ListItem key={idx}>
  //                     <ListItemText
  //                       primary={music.content}
  //                       secondary={<a href={music.link}>{music.link}</a>}
  //                     />
  //                   </ListItem>
  //                 ))}
  //               </List>
  //               <Divider sx={{ my: 2 }} />
  //               <Typography variant="h6" sx={{ mb: 1 }}>
  //                 Suggested Podcasts:
  //               </Typography>
  //               <List>
  //                 {result.content.podcasts?.map((podcast, idx) => (
  //                   <ListItem key={idx}>
  //                     <ListItemText
  //                       primary={podcast.content}
  //                       secondary={podcast.description}
  //                     />
  //                   </ListItem>
  //                 ))}
  //               </List>
  //             </>
  //           )}
  //         </CardContent>
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             mt: 2,
  //           }}
  //         >
  //           <Button variant="contained" color="primary" onClick={retry}>
  //             Try Again
  //           </Button>
  //         </Box>
  //       </Card>
  //     ) : !error ? (
  //       <Box sx={{ textAlign: "center" }}>
  //         <Typography variant="h4" sx={{ mb: 2 }}>
  //           Upload a Picture
  //         </Typography>
  //         <UploadFile
  //           setFile={setFile}
  //           file={file}
  //           setPrediction={setPrediction}
  //           prediction={prediction}
  //           handleSubmit={handleSubmit}
  //         />
  //       </Box>
  //     ) : (
  //       <Box sx={{ textAlign: "center" }}>
  //         <img src={nodata} alt="No data" style={{ width: "50%" }} />
  //         <Typography variant="h6" sx={{ mt: 2 }}>
  //           No result found! Please try again with a different image.
  //         </Typography>
  //         <Button variant="contained" color="error" onClick={retry}>
  //           Try Again
  //         </Button>
  //       </Box>
  //     )}
  //   </Box>
  // );

// const Predict = () => {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append("file", file);
//     setLoading(true)
//     try {
//       const response = await axios.post("https://8f81-34-148-49-15.ngrok-free.app/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log(response.data)
//       setPrediction(response.data);
//     } catch (error) {
//       console.error(error.response.data);
//       setError(true)
//     }
//     setLoading(false)
//   };

//   const result = emotions.find((val) => val.id === Number(prediction?.label));
//   if (result) {
//       console.log('Matching info:', result);
//   } else {
//       console.log('No match found for label:', prediction?.label);
//       console.log('And:',  emotions.find((val) => val.id === Number(prediction?.label)));
//   }
//   console.log("Prediction object:", prediction);

//   const retry = () => {
//     setFile(null);
//     setPrediction(null)
//   }
  return (
    <>
      <div className={styles.bgImg}>
        <img style={{width:"40%"}} src={bg}/>
      </div>
      <main className={styles.main}>
        {loading ? (
            <Loading />
        ) : prediction ? (
          <div className={styles.result}>
            <h2 className={styles.sectionTitle}>Prediction Result</h2>
            <span className={styles.warning}>
              * The information in this article is for reference only. To ensure safety and accuracy, you should consult a doctor or medical professional for thorough advice and examination.
            </span>
            <div style={{width: "100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap: 20}}>
              <img style={{width:"50%"}} src={URL.createObjectURL(file)}/>
              <button onClick={retry} className={styles.predictBut}><p>Try Again</p></button>
            </div>
            <h4 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              Diagnosed: <br />
              <p className={styles.resultText}>{result.label}</p>
            </h4>
            <h4>Quote for you:</h4>
            <p className={styles.resultText}>{result.quote}</p>
            <h4>Guggest musics:</h4>
            <ul>
              {result.content.music?.map((music) => (
                <li key={music.id}>
                  <p>{music.type}</p>
                  <p>{music.content}</p>
                  <a href={music.link}>{music.link}</a>
                </li>
              ))}
            </ul>
            <h4>Guggest podcasts:</h4>
            <ul>
              {result.content.podcasts?.map((podcast) => (
                <li key={podcast.id}>
                  <p>{podcast.type}</p>
                  <p>{podcast.content}</p>
                  <p>{podcast.description}</p>
                  <a href={podcast.link}>{podcast.link}</a>

                </li>
              ))}
            </ul>
            <h4>Guggest practices:</h4>
            <ul>
              {result.content.practices?.map((practice) => (
                <li key={practice.id}>
                  <p>{practice.type}</p>
                  <p>{practice.content}</p>
                  <p>{practice.description}</p>
                  <span>{practice.source}</span>
                  <a href={practice.link}>{practice.link}</a>
                </li>
              ))}
            </ul>
            <h4>Guggest activities:</h4>
            <ul>
              {result.content.activities?.map((activity) => (
                <li key={activity.id}>
                  <p>{activity.type}</p>
                  <p>{activity.content}</p>
                  <a href={activity.link}>{activity.link}</a>
                </li>
              ))}
            </ul>
            <h4>Guggest resources:</h4>
            <ul>
              {result.content.resources?.map((resource) => (
                <li key={resource.id}>
                  <p>{resource.type}</p>
                  <p>{resource.content}</p>
                  <a href={resource.link}>{resource.link}</a>
                </li>
              ))}
            </ul>
            <h4>Guggest plan:</h4>
            <ul>
              {result.content.plan?.map((plan) => (
                <li key={plan.id}>
                  <p>{plan.type}</p>
                  <p>{plan.content}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : !error ? (
          <div>
            <h1 className="tourney-headings" style={{padding:"16px 0"}}>Upload Shot</h1>
            <UploadFile
              setFile={setFile}
              file={file}
              setPrediction={setPrediction} 
              prediction={prediction} 
              handleSubmit={handleSubmit}
              />
          </div>
        ) : 
          <div className={styles.nodata}>
            <div className={styles.noDataImg}>
              <img src={nodata}/>
            </div>
            <h4>Don't have any result !!! Please remove and click another image !</h4>
            <button onClick={retry} className={styles.predictBut}><p>Try Again</p></button>
          </div>
        }   
    </main>
    </>
  );
};

export default Predict;
