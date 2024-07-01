'use client'

import { useEffect, useState } from "react";
import { getInterViewQuestions, captureResponse } from '../../../../../services/interviewService'
import { useRouter } from 'next/navigation';
import { getMeetingById } from "@/services/meetingScheduleService";

declare global {
    interface Window {
        SpeechRecognition:any;
        webkitSpeechRecognition: any;
        SpeechGrammarList: any;
        webkitSpeechGrammarList: any;
        SpeechRecognitionEvent: any;
        webkitSpeechRecognitionEvent: any;
    }
}


export default function StartInterviewDashboard({ id }: any) {
    const router = useRouter();
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers]: any = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [showAnswerList, setShowAnswerList] = useState([]);
    let [final_transcript_all] = useState('');
    let recognition: any;
    let silenceDetectionTimeout: any;
    let interViewQuestions: any[] = [];
    let nextIndex: any = 0;
    let totalAnswer: any;
    let candidate_id: any;
    let job_id: any;
    let repeat: any = 0;
    let final_transcript = '';
    let interim_transcript = '';
    let timeoutResumeInfinity: any;
    //let showAnswerList: any[] = []

    const colors = [
        "aqua",
        "azure",
        "beige",
        "bisque",
        "black",
        "blue",
        "brown",
        "chocolate",
        "coral" /* … */,
      ];
      const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(
        " | ",
      )};`;


    const getMeetingDetailsById = async () => {
        try {
            const response = await getMeetingById(id);
            candidate_id = response.data.candidate;
            job_id = response.data.job;
            if (candidate_id && job_id) {
                getQuestions();
            }

        } catch (error) {
            console.log("Error fetching questions: ", error);
        }
    };
    const speakQuestion = (question: any) => { 

        let utterance = new SpeechSynthesisUtterance('');
        let synth = window.speechSynthesis;
        let voices = synth.getVoices();

        if(repeat == 1) {
            utterance = new SpeechSynthesisUtterance('Okay, I will repeat the question. ' + question);
        } else {
            utterance = new SpeechSynthesisUtterance(question);
        }

        // for (let i = 0; i < voices.length; i++) {
        //     if (voices[i].name === 'Nicky') {
        //         // utterance.voice = voices[i];
        //     }
        // }

        utterance.rate = .5;
        window.speechSynthesis.cancel();
        synth.speak(utterance);

        utterance.onstart = function () {
            // console.log('Speech has started.');
        };

        utterance.onpause = function () {
            // console.log('Speech has been paused.');
        };

        utterance.onresume = function () {
            // console.log('Speech has been resumed.');
        };

        utterance.onboundary = function (event: any) {
            // console.log('Speech boundary has been reached.', event);
        };

        utterance.onmark = function (event: any) {
            // console.log('Speech mark has been reached.', event);
        };

        utterance.onerror = function (event: any) {
            console.error('Speech error occurred:', event.error);
        };

        utterance.onend = function () {
            // console.log('Speech has ended.');
            clearTimeout(timeoutResumeInfinity);
            startRecognition(question); // Start recognition after speaking
        };
    };

    // https://stackoverflow.com/questions/21947730/chrome-speech-synthesis-with-longer-texts
    const resumeInfinity = () => {
        window.speechSynthesis.resume();
        timeoutResumeInfinity = setTimeout(resumeInfinity, 1000);
    }

    const startRecognition = (questions: any) => { 
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        const SpeechGrammarList = new (window.SpeechGrammarList || window.webkitSpeechGrammarList)();
        // const SpeechRecognitionEvent = new (window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent)();

        SpeechGrammarList.addFromString(grammar, 1);
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

        recognition.onspeechstart = () => {
            // console.log('Speech has been detected.');
        };

        recognition.onspeechend = () => {
            // console.log('Speech has stopped being detected.');
        };

        recognition.onresult = (event: any) => {
            clearTimeout(silenceDetectionTimeout);
            final_transcript = '';
            interim_transcript = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                // if (event.results[i].isFinal) {
                //   final_transcript += event.results[i][0].transcript;
                // } else {
                //   interim_transcript += event.results[i][0].transcript;
                // }
                final_transcript += event.results[i][0].transcript;
            }
            final_transcript = final_transcript;
            interim_transcript = interim_transcript;
            final_transcript_all =  final_transcript;

            console.log(final_transcript);

            if (event.results[event.results.length - 1].isFinal) {
                // const answer = event.results[event.results.length - 1][0].transcript;
                setTimeout(() => handleAnswer(final_transcript), 2000);
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

        if (interViewQuestions.length) {
            //Check length of the question and Clear the timeout
        }

        silenceDetectionTimeout = setTimeout(() => {
            if(repeat == 0) {
                repeat++;
                speakQuestion(questions);
            } else {
                interViewQuestions[nextIndex].answer = 'Candidate did not respond in time or failed to answer.';
                interViewQuestions[nextIndex].isDone = true;
                interViewQuestions[nextIndex].isAnswered = false;
                if(interViewQuestions[nextIndex]) {
                    setShowAnswerList(prevList => [...prevList, {
                        question: interViewQuestions[nextIndex].question,
                        answer: interViewQuestions[nextIndex].answer,
                    }] as any);
                }
                moveToNextQuestion();
            }
        }, 5000); // Adjust the timeout duration to suit your needs
    };

    const handleAnswer = (answer: any) => {
        setAnswers((prevAnswers: any) => {
            interViewQuestions[nextIndex].answer = answer;
            interViewQuestions[nextIndex].isDone = true;
            interViewQuestions[nextIndex].isAnswered = true;
            if(interViewQuestions[nextIndex]) {
                setShowAnswerList(prevList => [...prevList, {
                    question: interViewQuestions[nextIndex].question,
                    answer: interViewQuestions[nextIndex].answer,
                }] as any);
            }
            if (nextIndex < interViewQuestions.length) {
                moveToNextQuestion();
            }
            return interViewQuestions;
        });

        // 10 seconds delay before asking the next question
    };

    const moveToNextQuestion = () => {
        repeat = 0;
        setCurrentQuestionIndex(prevIndex => {
            nextIndex = prevIndex + 1;
            if (nextIndex < interViewQuestions.length) {
                speakQuestion(interViewQuestions[nextIndex]?.question);
                return nextIndex;
            } else {
                captureAnswer(interViewQuestions)
                return prevIndex;
            }
        });
    };


    const getQuestions = async () => {
        try {
            const response = await getInterViewQuestions(candidate_id, job_id);
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
        try {
            const response = await captureResponse(body);
            if (response.status == 'success') {
                router.push("/successfull-interview");
            }
        } catch (error) {
            console.log("error", error)
        }
    }

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
            {showAnswerList.length !== questions.length && (
                <div>
                    <h1>Interview Dashboard</h1>
                    <div className="question" id="question">
                        <div className="card">
                            <div className="card-header">Question</div>
                            <div className="card-body">
                                <p className="card-text">{questions[currentQuestionIndex]?.question}</p>
                            </div>

                        </div>
                    </div>
                </div>
            )
            }
            <div>
                {showAnswerList.length === questions.length && (
                       <h1>Interview Complete, Saving...</h1>
                )}

                {showAnswerList.length !== questions.length && (
                    <section>
                        <div id="recording-indicator" style={{ display: 'none' }}>
                            <p>Recording...</p>
                        </div>
        
                        <h3>Interview Question/Answer</h3>
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
                                        {showAnswerList.map((item: any, index) => (
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
                </section>
            )}
            </div>
        </div>

    );
}