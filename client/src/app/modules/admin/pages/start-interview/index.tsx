'use client'

import { useEffect, useState } from "react";
import { getInterViewQuestions, captureResponse } from '../../../../../services/interviewService'

export default function StartInterviewDashboard() {
    const [data, setData] = useState<any>([]);

 
    let synth = window.speechSynthesis.getVoices();
    let recognition: any;
    let silenceDetectionTimeout: any;
    function initSpeech() {
        console.log("interview chat");
        //speakQuestion('{{ question }}');
    }

    // function speakQuestion(question: any) {
    //     if (synth) {
    //         console.error('Speech synthesis is already in progress.');
    //         return;
    //     }

    //     const utterance = new SpeechSynthesisUtterance(question);
    //     utterance.onend = function (event) {
    //         startRecognition(); // Start recognition after speaking
    //     };
    //     synth.speak(utterance);
    // }

    const speakQuestion = (question: any) => {
        console.log("question///", question);
        question.map((questions: any) => {
            const utterance = new SpeechSynthesisUtterance(questions.question);
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                const synth = window.speechSynthesis;
                //const utterance = new SpeechSynthesisUtterance(question);
                console.log("speack.....", utterance)
                synth.speak(utterance);
                utterance.onend = function (event) {
                    startRecognition(); // Start recognition after speaking
                };

            }
        })

    }


    function startRecognition() {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.continuous = true;
        console.log("recognization......", recognition)
       
        recognition.onstart = () => {
            document.getElementById('recording-indicator').style.display = 'block';
            // recognitionTimeout = setTimeout(stopRecognition, 10000);
        };

        recognition.onresult = (event: any) => {
            clearTimeout(silenceDetectionTimeout);
            const answer = event.results[0][0].transcript;

            // Reset the silence detection timeout every time there is new input
            silenceDetectionTimeout = setTimeout(() => {
                recognition.stop(); // Stop the recognition if there's silence
            }, 10000); // Adjust the timeout duration to suit your needs

            if (!event.results[0].isFinal) {
                return; // Ignore interim results
            }
            sendTextToServer(answer);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error occurred:', event.error);
        };

        // recognition.onend = () => {  
        //     document.getElementById('recording-indicator').style.display = 'none';
        //     setTimeout(() => window.location.reload(), 1000);
        // };

        recognition.start();
    }

    async function getQuestions() {
        try {
            const response = await getInterViewQuestions();
            console.log("questions", response.data.history);
            console.log("questions....",response);
            speakQuestion(response.data.history)
            //let value = window.speechSynthesis.speak(new SpeechSynthesisUtterance("Hello world!"));

        } catch (error: any) {
            console.log("error...", error)
        }
    }

    async function captureAnswer(answer: any) {
        let body = {
            response: answer,
        }
        try {
            const response = await captureResponse(body);
            console.log("capture answer", response)
        } catch (error) {
            console.log("error", error)
        }
    }
    async function sendTextToServer(text: any) {
        console.log("text..........", text)
        if (text) {
            captureAnswer(text)
        }


        // fetch('http://127.0.0.1:5000/capture_response', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ answer: text }),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Server Response: ', data);
        //     if (data.status === 'success') {
        //         window.location.href = '/conduct_interview'; 
        //     } else if (data.status === 'completed') {
        //         window.location.href = '/interview_completed';
        //     }
        //     if (data.status === 'repeat') {
        //         // shouldReload = false;
        //         // initSpeech();
        //     } else {
        //         // Move to the next question after the response is processed
        //         shouldReload = true;
        //     }
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
    }

    // function updateHistory(question: any, answer: any) {
    //     const historyElement = document.querySelector('.history ul');
    //     const newHistoryItem = document.createElement('li');
    //     newHistoryItem.textContent = `Question: ${question} - Answer: ${answer}`;
    //     historyElement.appendChild(newHistoryItem);
    // }

    useEffect(() => {
        getQuestions();
        initSpeech();

    });
    return (
        <div>
            <h1>Interview Dashboard</h1>
            <div className="question" id="question">

                <div className="card">
                    <div className="card-header">
                        Question
                    </div>
                    <div className="card-body" >
                        <p className="card-text">question</p>
                    </div>
                </div>
            </div>

            <div className="history">
                <div className="card">
                    <div className="card-header">
                        History
                    </div>
                    <div className="card-body">
                        {/* <ul class="list-group list-group-flush">
                        {% for response in history %}
                            <li class="list-group-item" style="border-bottom: 0;"><b>Question:</b> {{ response.Question }}</li>
                            <li class="list-group-item"><b>Response:</b> {{ response.response }}</li>
                        {% endfor %}
                    </ul> */}
                    </div>
                </div>
            </div>

            <div id="recording-indicator">Recording...</div>
        </div>



    )
}


