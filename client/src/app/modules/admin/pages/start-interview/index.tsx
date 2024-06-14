'use client'

import { useEffect, useState } from "react";
import { getInterViewQuestions, captureResponse } from '../../../../../services/interviewService'
import { useRouter } from 'next/navigation';
import { getMeetingById } from "@/services/meetingScheduleService";

export default function StartInterviewDashboard({ id }: any) {
    console.log("start interview id.....", id)
    const router = useRouter();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [showAnswerList, setShowAnswerList] = useState([]);
    let recognition: any;
    let silenceDetectionTimeout: any;
    let interViewQuestions: any[] = [];
    let nextIndex: any = 0;
    let totalAnswer: any;
    let candidate_id: any;
    let job_id: any;
    //let showAnswerList: any[] = []


    const getMeetingDetailsById = async () => {
        try {
            const response = await getMeetingById(id);
            console.log("questions Meeting......", response.data)
            candidate_id = response.data.candidate;
            job_id = response.data.job;
            console.log("candidate_id/.....", candidate_id);
            console.log("job_id.....", job_id);
            if (candidate_id && job_id) {
                getQuestions();
            }

        } catch (error) {
            console.log("Error fetching questions: ", error);
        }
    };
    const speakQuestion = (question: any) => {
        if (question) {
            const utterance = new SpeechSynthesisUtterance(question);
            const synth = window.speechSynthesis;

            synth.speak(utterance);

            utterance.onend = function () {
                startRecognition(question); // Start recognition after speaking
            };
        }

    };

    const startRecognition = (questions: any) => {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.continuous = true;

        recognition.onstart = () => {
            setIsRecording(true);
            const recordingIndicator = document.getElementById('recording-indicator');
            if (recordingIndicator) {
                recordingIndicator.style.display = 'block';
            }
        };

        recognition.onresult = (event: any) => {
            clearTimeout(silenceDetectionTimeout);
            const answer = event.results[0][0].transcript;
            console.log("answer", event.results[0][0].transcript)

            if (event.results[0].isFinal) {
                handleAnswer(answer);
                //recognition.stop(); // Stop recognition after receiving the answer
            }
        };

        recognition.onend = () => {
            setIsRecording(false);

            const recordingIndicator = document.getElementById('recording-indicator');
            if (recordingIndicator) {
                recordingIndicator.style.display = 'none';
            }
        };
        recognition.start();

        silenceDetectionTimeout = setTimeout(() => {
            speakQuestion(questions);
            //recognition.stop(); // Stop the recognition if there's silence
        }, 5000); // Adjust the timeout duration to suit your needs
    };

    // const handleAnswer = (answer:any,questions:any) => {
    //     debugger
    //     //getQuestions();
    //     console.log("/////",questions);
    //     console.log('..................',currentQuestionIndex)
    //     setAnswers(prevAnswers => {
    //         const newAnswers = [...prevAnswers];
    //        let ans= interViewQuestions[currentQuestionIndex].answer = answer
    //         newAnswers[currentQuestionIndex] = ans
    //         // newAnswers[currentQuestionIndex] = { que: interViewQuestions[currentQuestionIndex], answer };
    //         console.log("new answer",newAnswers)
    //         return newAnswers;
    //     });

    //     setTimeout(() => {
    //         moveToNextQuestion();
    //     }, 10000); // 10 seconds delay before asking the next question
    // };

    const handleAnswer = (answer: any) => {
        console.log("candidate answer", answer)
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            console.log("next index......",nextIndex)
            console.log("question next index....",interViewQuestions[nextIndex])
            interViewQuestions[nextIndex].answer = answer;
            //newAnswers[currentQuestionIndex] = interViewQuestions[currentQuestionIndex];
            console.log("interview questions//////////", interViewQuestions);
            setShowAnswerList(prevList => [...prevList, {
                question: interViewQuestions[nextIndex].question,
                answer: interViewQuestions[nextIndex].answer,
            }]);


            console.log("answer list", showAnswerList)
            if (interViewQuestions[nextIndex].answer) {
                moveToNextQuestion();
            }
            // setTimeout(() => {
            //     moveToNextQuestion();
            // }, 5000);
            return interViewQuestions;
        });

        // 10 seconds delay before asking the next question
    };

    const moveToNextQuestion = () => {
        
        setCurrentQuestionIndex(prevIndex => {
            nextIndex = prevIndex + 1;
            console.log("next index///", nextIndex);
            if (nextIndex < interViewQuestions.length) {
                
                speakQuestion(interViewQuestions[nextIndex]?.question);
                console.log("new currentIndex", currentQuestionIndex)
                return nextIndex;
            } else {
                console.log('Interview completed.');
                captureAnswer(interViewQuestions)
                return prevIndex;
            }
        });
    };


    const getQuestions = async () => {
        try {
            const response = await getInterViewQuestions(candidate_id, job_id);
            console.log("questions......", response.data)
            interViewQuestions = response.data;
            setQuestions(response.data);
            if (response.data.length > 0) {
                speakQuestion(response.data[0].question);
            }
        } catch (error) {
            console.log("Error fetching questions: ", error);
        }
    };



    async function captureAnswer(answer: any) {
        let body = {
            candidate_id: candidate_id,
            job_id: job_id,
            answers: answer,
        }
        console.log("capture the answer........",body)
        try {
            const response = await captureResponse(body);
            console.log("capture answer", response)
            if (response.status == 'success') {
                router.push("/successfull-interview");
            }
        } catch (error) {
            console.log("error", error)
        }
    }


    // useEffect(() => {
    //     getQuestions();
    // }, []);

    useEffect(() => {
        if (id) {
            getMeetingDetailsById();
        }
        return () => {
            window.speechSynthesis.cancel();
            if (recognition) {
                recognition.stop();
            }
            clearTimeout(silenceDetectionTimeout);
        };
    }, []);


    return (
        <div>
            <h1>Interview Dashboard</h1>
            <div className="question" id="question">
                <div className="card">
                    <div className="card-header">Question</div>
                    <div className="card-body">
                        <p className="card-text">{questions[currentQuestionIndex]?.question}</p>
                    </div>
                    {/* <div>
                        <textarea
                            placeholder="Recording answer..."
                            value={answers[currentQuestionIndex]?.answer || ''}
                            readOnly
                        />
                    </div> */}

                </div>
            </div>
            <div id="recording-indicator" style={{ display: 'none' }}>
                <p>Recording...</p>
            </div>

            {/* <div className="relative overflow-x-auto" >
                <div></div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr.no
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Questions
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Answer
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {showAnswerList.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-3">{index + 1}</td>
                                <td className="px-6 py-3">{item.question}</td>
                                <td className="px-6 py-3">{item.answer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}

            <div>
                <h3>Interview Question/Answer  </h3>
                {showAnswerList.length > 0 ? (
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Sr.no
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Questions
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Answer
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {showAnswerList.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-3">{index + 1}</td>
                                        <td className="px-6 py-3">{item.question}</td>
                                        <td className="px-6 py-3">{item.answer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p></p>
                )}
            </div>


        </div>

    );
}






// export default function StartInterviewDashboard() {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);
//     const [isRecording, setIsRecording] = useState(false);

//     let recognition:any;
//     let silenceDetectionTimeout:any;

//     const speakQuestion = (question:any) => {
//         const utterance = new SpeechSynthesisUtterance(question);
//         const synth = window.speechSynthesis;

//         synth.speak(utterance);

//         utterance.onend = function () {
//             startRecognition(); // Start recognition after speaking
//         };
//     };

//     const startRecognition = () => {
//         recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//         recognition.interimResults = false;
//         recognition.lang = 'en-US';
//         recognition.continuous = false;

//         recognition.onstart = () => {
//             setIsRecording(true);
//             document.getElementById('recording-indicator').style.display = 'block';
//         };

//         recognition.onresult = (event:any) => {
//             clearTimeout(silenceDetectionTimeout);
//             const answer = event.results[0][0].transcript;

//             if (event.results[0].isFinal) {
//                 handleAnswer(answer);
//                 recognition.stop(); // Stop recognition after receiving the answer
//             }
//         };

//         recognition.onerror = (event:any) => {
//             console.error('Speech recognition error occurred:', event.error);
//             if (event.error === 'aborted') {
//                 // Handle the aborted error if needed
//             }
//         };

//         recognition.onend = () => {
//             setIsRecording(false);
//             document.getElementById('recording-indicator').style.display = 'none';
//         };

//         recognition.start();

//         silenceDetectionTimeout = setTimeout(() => {
//             recognition.stop(); // Stop the recognition if there's silence
//         }, 10000); // Adjust the timeout duration to suit your needs
//     };

//     const handleAnswer = (answer:any) => {
//         console.log('......',questions[currentQuestionIndex],questions)
//         setAnswers(prevAnswers => {
//             const newAnswers = [...prevAnswers];

//             newAnswers[currentQuestionIndex] = { question: questions[currentQuestionIndex], answer };
//             console.log("answer....",newAnswers)
//             let dataAnswer:any[] =[];
//             dataAnswer.push(newAnswers)
//             console.log("answer collection",dataAnswer)
//             return newAnswers;
//         });
//         setTimeout(() => {
//             moveToNextQuestion();
//         }, 10000); // 1 minutes delay before asking the next question
//     };



//     const moveToNextQuestion = () => {
//         debugger
//         setCurrentQuestionIndex(prevIndex => {
//             const nextIndex = prevIndex + 1;
//             if (nextIndex < questions.length) {
//                 speakQuestion(questions[nextIndex].question);
//                 return nextIndex;
//             } else {
//                 console.log('Interview completed.');
//                 return prevIndex;
//             }
//         });
//     };

//     const getQuestions = async () => {
//         try {
//             const response = await getInterViewQuestions();
//             setQuestions(response.data);
//             if (response.data.length > 0) {
//                 speakQuestion(response.data[0].question);
//             }
//         } catch (error) {
//             console.log("Error fetching questions: ", error);
//         }
//     };

//     useEffect(() => {
//         getQuestions();
//     }, []);

//     return (
//         <div>
//             <h1>Interview Dashboard</h1>
//             <div className="question" id="question">
//                 <div className="card">
//                     <div className="card-header">Question</div>
//                     <div className="card-body">
//                         <p className="card-text">{questions[currentQuestionIndex]?.question}</p>
//                     </div>
//                     <div>
//                         <textarea
//                             placeholder="Recording answer..."
//                             value={answers[currentQuestionIndex]?.answer || ''}
//                             readOnly
//                         />
//                     </div>
//                 </div>
//             </div>
//             <div id="recording-indicator" style={{ display: 'none' }}>
//                 <p>Recording...</p>
//             </div>
//         </div>
//     );
// }

// export default function StartInterviewDashboard() {
//     const [data, setData] = useState<any>([]);


//     let synth = window.speechSynthesis.getVoices();
//     let recognition: any;
//     let silenceDetectionTimeout: any;
//     function initSpeech() {
//         console.log("interview chat");
//         //speakQuestion('{{ question }}');
//     }

//     // function speakQuestion(question: any) {
//     //     if (synth) {
//     //         console.error('Speech synthesis is already in progress.');
//     //         return;
//     //     }

//     //     const utterance = new SpeechSynthesisUtterance(question);
//     //     utterance.onend = function (event) {
//     //         startRecognition(); // Start recognition after speaking
//     //     };
//     //     synth.speak(utterance);
//     // }

//     const speakQuestion = (question: any) => {
//         console.log("question///", question);
//         question.map((questions: any) => {
//             const utterance = new SpeechSynthesisUtterance(questions.question);
//             if (typeof window !== 'undefined' && window.speechSynthesis) {
//                 const synth = window.speechSynthesis;
//                 //const utterance = new SpeechSynthesisUtterance(question);
//                 console.log("speack.....", utterance)
//                 synth.speak(utterance);
//                 utterance.onend = function (event) {
//                     startRecognition(); // Start recognition after speaking
//                 };

//             }
//         })

//     }


//     function startRecognition() {
//         recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//         recognition.interimResults = true;
//         recognition.lang = 'en-US';
//         recognition.continuous = true;
//         console.log("recognization......", recognition)

//         recognition.onstart = () => {
//             document.getElementById('recording-indicator').style.display = 'block';
//             // recognitionTimeout = setTimeout(stopRecognition, 10000);
//         };

//         recognition.onresult = (event: any) => {
//             clearTimeout(silenceDetectionTimeout);
//             const answer = event.results[0][0].transcript;

//             // Reset the silence detection timeout every time there is new input
//             silenceDetectionTimeout = setTimeout(() => {
//                 recognition.stop(); // Stop the recognition if there's silence
//             }, 10000); // Adjust the timeout duration to suit your needs

//             if (!event.results[0].isFinal) {
//                 return; // Ignore interim results
//             }
//             sendTextToServer(answer);
//         };

//         recognition.onerror = (event: any) => {
//             console.error('Speech recognition error occurred:', event.error);
//         };

//         // recognition.onend = () => {
//         //     document.getElementById('recording-indicator').style.display = 'none';
//         //     setTimeout(() => window.location.reload(), 1000);
//         // };

//         recognition.start();
//     }

//     async function getQuestions() {
//         try {
//             const response = await getInterViewQuestions();
//             //console.log("questions", response.data.history);
//             console.log("questions....",response);
//             speakQuestion(response.data)
//             //let value = window.speechSynthesis.speak(new SpeechSynthesisUtterance("Hello world!"));

//         } catch (error: any) {
//             console.log("error...", error)
//         }
//     }

//     async function captureAnswer(answer: any) {
//         let body = {
//             response: answer,
//         }
//         try {
//             const response = await captureResponse(body);
//             console.log("capture answer", response)
//         } catch (error) {
//             console.log("error", error)
//         }
//     }
//     async function sendTextToServer(text: any) {
//         console.log("text..........", text)
//         if (text) {
//             captureAnswer(text)
//         }


//         // fetch('http://127.0.0.1:5000/capture_response', {
//         //     method: 'POST',
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     },
//         //     body: JSON.stringify({ answer: text }),
//         // })
//         // .then(response => response.json())
//         // .then(data => {
//         //     console.log('Server Response: ', data);
//         //     if (data.status === 'success') {
//         //         window.location.href = '/conduct_interview';
//         //     } else if (data.status === 'completed') {
//         //         window.location.href = '/interview_completed';
//         //     }
//         //     if (data.status === 'repeat') {
//         //         // shouldReload = false;
//         //         // initSpeech();
//         //     } else {
//         //         // Move to the next question after the response is processed
//         //         shouldReload = true;
//         //     }
//         // })
//         // .catch(error => {
//         //     console.error('Error:', error);
//         // });
//     }

//     // function updateHistory(question: any, answer: any) {
//     //     const historyElement = document.querySelector('.history ul');
//     //     const newHistoryItem = document.createElement('li');
//     //     newHistoryItem.textContent = `Question: ${question} - Answer: ${answer}`;
//     //     historyElement.appendChild(newHistoryItem);
//     // }

//     useEffect(() => {
//         getQuestions();
//         initSpeech();

//     });
//     return (
//         <div>
//             <h1>Interview Dashboard</h1>
//             <div className="question" id="question">

//                 <div className="card">
//                     <div className="card-header">
//                         Question
//                     </div>
//                     <div className="card-body" >
//                         <p className="card-text">question</p>
//                     </div>
//                     <div>
//                         <textarea  placeholder="enter the answer"></textarea>
//                     </div>
//                 </div>
//             </div>

//             <div className="history">
//                 <div className="card">
//                     <div className="card-header">
//                         History
//                     </div>
//                     <div className="card-body">
//                         {/* <ul class="list-group list-group-flush">
//                         {% for response in history %}
//                             <li class="list-group-item" style="border-bottom: 0;"><b>Question:</b> {{ response.Question }}</li>
//                             <li class="list-group-item"><b>Response:</b> {{ response.response }}</li>
//                         {% endfor %}
//                     </ul> */}
//                     </div>
//                 </div>
//             </div>

//             <div id="recording-indicator">Recording...</div>
//         </div>



//     )
// }

// export default function StartInterviewDashboard() {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);


//     let recognition: any;
//     let silenceDetectionTimeout: any;

//     const speakQuestion = (question: any) => {
//         const utterance = new SpeechSynthesisUtterance(question);
//         const synth = window.speechSynthesis;

//         synth.speak(utterance);

//         utterance.onend = function () {
//             //startRecognition(); // Start recognition after speaking
//         };
//     };

//     const startRecognition = () => {
//         recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//         recognition.interimResults = true;
//         recognition.lang = 'en-US';
//         recognition.continuous = true;

//         recognition.onstart = () => {
//             document.getElementById('recording-indicator').style.display = 'block';
//         };

//         recognition.onresult = (event: any) => {
//             debugger
//             clearTimeout(silenceDetectionTimeout);
//             const answer = event.results[0][0].transcript;

//             // Reset the silence detection timeout every time there is new input
//             silenceDetectionTimeout = setTimeout(() => {
//                 recognition.stop(); // Stop the recognition if there's silence
//             }, 10000); // Adjust the timeout duration to suit your needs

//             if (event.results[0].isFinal) {

//                 sendTextToServer(answer);
//                 recognition.stop(); // Stop recognition after receiving the answer
//             }
//         };

//         recognition.onerror = (event: any) => {
//             console.error('Speech recognition error occurred:', event.error);
//         };

//         // recognition.onend = () => {
//         //     debugger
//         //     document.getElementById('recording-indicator').style.display = 'none';
//         //     moveToNextQuestion(); // Move to the next question after recognition ends
//         // };

//         recognition.onend = () => {
//             document.getElementById('recording-indicator').style.display = 'none';
//             // Delay the next question
//             setTimeout(moveToNextQuestion, 10000); // 5000 milliseconds = 5 seconds
//         };

//         recognition.start();
//     };

//     // const moveToNextQuestion = () => {
//     //     setCurrentQuestionIndex(prevIndex => {
//     //         const nextIndex = prevIndex + 1;
//     //         if (nextIndex < questions.length) {
//     //             // Delay speaking the next question
//     //             setTimeout(() => speakQuestion(questions[nextIndex].question), 10000);
//     //             return nextIndex;
//     //         }
//     //         return prevIndex;
//     //     });
//     // };

//     // const moveToNextQuestion = () => {
//     //     setCurrentQuestionIndex(prevIndex => {
//     //         const nextIndex = prevIndex + 1;
//     //         if (nextIndex < questions.length) {
//     //             // Delay speaking the next question
//     //             setTimeout(() => speakQuestion(questions[nextIndex].question), 10000);
//     //             return nextIndex;
//     //         }
//     //         return prevIndex;
//     //     });
//     // };

//     const moveToNextQuestion = () => {
//         setCurrentQuestionIndex(prevIndex => {
//             const nextIndex = prevIndex + 1;
//             if (nextIndex < questions.length) {
//                 speakQuestion(questions[nextIndex].question);
//                 return nextIndex;
//             }
//             return prevIndex;
//         });
//     };

//     const getQuestions = async () => {
//         try {
//             const response = await getInterViewQuestions();
//             setQuestions(response.data);
//             if (response.data.length > 0) {
//                 speakQuestion(response.data[0].question);
//             }
//         } catch (error) {
//             console.log("Error fetching questions: ", error);
//         }
//     };

//     const sendTextToServer = async (text: any) => {
//         console.log("Captured answer: ", text);
//         if (text) {
//             //await captureResponse(text);
//         }
//     };

//     // const handleAnswer = (event: any) => {
//     //     const answer = event.target.value;
//     //     setAnswers(prevAnswers => {
//     //         const newAnswers = [...prevAnswers];
//     //         newAnswers[currentQuestionIndex] = answer;
//     //         console.log("answer....",newAnswers)
//     //         return newAnswers;
//     //     });
//     // };

//     const handleAnswer = (event: any) => {
//         const answer = event.target.value;
//         setAnswers(prevAnswers => {
//             const newAnswers = [...prevAnswers];
//             newAnswers[currentQuestionIndex] = { question: questions[currentQuestionIndex]?.question, answer };
//             console.log("answee", newAnswers)
//             return newAnswers;
//         });
//     };

//     useEffect(() => {
//         getQuestions();
//     }, []);

//     return (
//         <div>
//             <h1>Interview Dashboard</h1>
//             <div className="question" id="question">
//                 <div className="card">
//                     <div className="card-header">Question</div>
//                     <div className="card-body">
//                         <p className="card-text">{questions[currentQuestionIndex]?.question}</p>
//                     </div>
//                     <div>
//                         <textarea
//                             placeholder="Enter the answer"
//                             value={answers[currentQuestionIndex]?.answer || ''}
//                             onChange={handleAnswer}
//                             onKeyPress={(event) => {
//                                 if (event.key === 'Enter') {
//                                     event.preventDefault(); // Prevent form submission
//                                     moveToNextQuestion();
//                                 }
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//             <div id="recording-indicator" style={{ display: 'none' }}>
//                 <p>Recording...</p>
//             </div>
//         </div>
//     );
// }



