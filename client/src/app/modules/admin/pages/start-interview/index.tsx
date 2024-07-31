'use client';

import { useEffect, useState, useRef, useDebugValue } from "react";
import { getInterViewQuestions, captureResponse } from '../../../../../services/interviewService';
import { useRouter } from 'next/navigation';
import { getMeetingById } from "@/services/meetingScheduleService";
import { Loader } from 'rizzui';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
        SpeechGrammarList: any;
        webkitSpeechGrammarList: any;
        SpeechRecognitionEvent: any;
        webkitSpeechRecognitionEvent: any;
    }
}

export default function StartInterviewDashboard({ id }: any) {
    const router = useRouter();
    const [que, setNextQuestions] = useState<any[]>([]);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [showAnswerList, setShowAnswerList] = useState<any[]>([]);
    const [finalTranscript, setFinalTranscript] = useState('');
    const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
    const [isCandidateSpeaking, setIsCandidateSpeaking] = useState(false);
    const [showStartButton, setShowStartButton] = useState(true);
    const [showSpeakButton, setShowSpeakButton] = useState(false);
    const [showStopButton, setShowStopButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showAnswerSection, setShowAnswerSection] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const recognitionRef = useRef<any>(null);
    const timeoutResumeInfinityRef = useRef<any>(null);
    const silenceDetectionTimeoutRef = useRef<any>(null);
    const interim_transcriptRef = useRef<string>('');
    const repeatRef = useRef<number>(0);
    const [candidateId, setCandidateId] = useState<any>(null); // State for candidate_id
    const [jobId, setJobId] = useState<any>(null); // State for job_id
    
    const colors = [
        "aqua", "azure", "beige", "bisque", "black", "blue", "brown", "chocolate", "coral" /* … */
    ];
    const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(" | ")};`;

    const getMeetingDetailsById = async () => {
        try {
            const response = await getMeetingById(id);
            console.log("response...", response);
            setCandidateId(response.data.candidate);
            setJobId(response.data.job);
            if (response.data.candidate && response.data.job) {
                getQuestions(response.data.candidate, response.data.job);
            }
        } catch (error) {
            console.log("Error fetching questions: ", error);
        }
    };

    const speakQuestion = (question: any) => {
        setIsInterviewerSpeaking(true);
        console.log("repeat......", repeatRef.current);
        let utterance = new SpeechSynthesisUtterance('');
        let synth = window.speechSynthesis;

        if (repeatRef.current === 1) {
            if (showStopButton) {

            }
            else {
                // utterance = new SpeechSynthesisUtterance('Okay, I will repeat the question. ' + question);

            }
        } else {
            utterance = new SpeechSynthesisUtterance(question);
        }

        utterance.rate = 0.5;
        window.speechSynthesis.cancel();
        synth.speak(utterance);

        utterance.onend = function () {
            clearTimeout(timeoutResumeInfinityRef.current);
            setIsInterviewerSpeaking(false);
            setShowSpeakButton(true);
            setShowStopButton(false);
        };
    };

    const resumeInfinity = () => {
        window.speechSynthesis.resume();
        timeoutResumeInfinityRef.current = setTimeout(resumeInfinity, 1000);
    };

    const startRecognition = (question: any) => {
        setIsCandidateSpeaking(true);
        setShowStopButton(true);
        setShowNextButton(false);
        setShowAnswerSection(false);
        setIsInterviewerSpeaking(false);
        setShowSpeakButton(false);

        recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        const SpeechGrammarList = new (window.SpeechGrammarList || window.webkitSpeechGrammarList)();

        SpeechGrammarList.addFromString(grammar, 1);
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.continuous = true;

        recognitionRef.current.onstart = () => {
            setIsRecording(true);
            const recordingIndicator = document.getElementById('recording-indicator');
            if (recordingIndicator) {
                recordingIndicator.style.display = 'block';
            }
        };

        recognitionRef.current.onresult = (event: any) => {
            clearTimeout(silenceDetectionTimeoutRef.current);
            let final_transcript = '';
            interim_transcriptRef.current = '';
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i][0].transcript) {
                    final_transcript += event.results[i][0].transcript;
                }
            }

            setFinalTranscript(final_transcript);

            if (event.results[event.results.length - 1].isFinal) {
                handleAnswer(final_transcript);
            }
        };

        recognitionRef.current.onend = () => {
            setIsRecording(false);
            const recordingIndicator = document.getElementById('recording-indicator');
            if (recordingIndicator) {
                recordingIndicator.style.display = 'none';
            }
        };

        recognitionRef.current.start();

        // silenceDetectionTimeoutRef.current = setTimeout(() => {
        //     if (repeatRef.current === 0) {
        //         repeatRef.current++;
        //         speakQuestion(question);
        //     } else {
        //         handleAnswer('Candidate did not respond in time or failed to answer.');
        //     }
        // }, 5000); // Adjust the timeout duration to suit your needs
    };

    const handleAnswer = (answer: any) => {
        setAnswers((prevAnswers: any) => {
            console.log("answer",answer);
            const que = questions[currentQuestionIndex];
            que.answer = answer;
            que.isDone = true;
            que.isAnswered = true;
            console.log("ques...",que)
            // const updatedQuestions = [...questions];
            // updatedQuestions[currentQuestionIndex].answer = answer;
            // updatedQuestions[currentQuestionIndex].isDone = true;
            // updatedQuestions[currentQuestionIndex].isAnswered = true;
            console.log("answer...",que)
            setNextQuestions(que);
            // setQuestions(que);
            setShowAnswerList(prevList => [...prevList, {
                // question: que[currentQuestionIndex].question,
                question : que.question,
                answer: answer,
            }] as any);
            //setIsCandidateSpeaking(false);
            //setShowAnswerSection(true);

            return que;
        });
    };


    const moveToNextQuestion = () => {
        captureAnswer(que);
        setFinalTranscript('');
        setCurrentQuestionIndex(prevIndex => {
            const nextIndex = prevIndex + 1;
            if (nextIndex < questions.length) {
                speakQuestion(questions[nextIndex].question);
                return nextIndex;
            } else {
                console.log("Interview completed.");
                router.push("/successfull-interview");
                return prevIndex;
            }
        });
           
    }
    
    // const moveToNextQuestion = () => {
    //     repeatRef.current = 0;
    //     setFinalTranscript('');
    //     setCurrentQuestionIndex(prevIndex => {
    //         const nextIndex = prevIndex + 1;
    //         if (nextIndex < questions.length) {
    //             speakQuestion(questions[nextIndex].question);
    //             return nextIndex;
    //         } else {
    //             captureAnswer(questions);
    //             return prevIndex;
    //         }
    //     });
    // };


    const getQuestions = async (candidate_id: any, job_id: any) => {
        try {
            const response = await getInterViewQuestions(candidate_id, job_id);
            if (response) {
                setLoading(false);
                const fetchedQuestions = response.data;
                setQuestions(fetchedQuestions);
                if (fetchedQuestions.length > 0) {
                    speakQuestion(fetchedQuestions[0].question);
                }
            }
        } catch (error) {
            console.log("Error fetching questions: ", error);
        }
    };

    async function captureAnswer(answer: any) {
        console.log("candidate id", candidateId);
        console.log("job id", jobId);
        let body = {
            candidate_id: candidateId,
            job_id: jobId,
            answers: answer,
        };

        console.log("body", body);
        try {
            const response = await captureResponse(body);
            // if (response.status === 'success') {
            //     // router.push("/successfull-interview");
            // }
        } catch (error) {
            console.log("error", error);
        }
    }

    function onStart() {
        console.log("on click start");
        if (id) {
            setLoading(true);
            getMeetingDetailsById();
            setShowStartButton(false);
        }
    }

    function onSpeak() {
        console.log("on click speak");
        setShowSpeakButton(false);
        setShowStopButton(false);
        setShowNextButton(false);
        startRecognition(questions[currentQuestionIndex].question);
    }

    function onStop() {
        console.log("on click stop");
        setIsRecording(false);
        setIsCandidateSpeaking(false);
        const recordingIndicator = document.getElementById('recording-indicator');
        if (recordingIndicator) {
            recordingIndicator.style.display = 'none';
        }
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        if (!finalTranscript.trim()) {
            handleAnswer('');
        }
        setShowStopButton(false);
        setShowNextButton(true);
        setShowAnswerSection(true);
    }

    function onNext() {
        console.log("on click next ");
        setShowNextButton(false);
        setShowStopButton(false);
        setShowSpeakButton(false);
        setIsCandidateSpeaking(false);
        setShowAnswerSection(false);
        moveToNextQuestion();
    }

    return (
        <div className="relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <Loader variant="spinner" size="lg" />
                    <p>Please wait, preparing the questions...</p>
                </div>
            )}
            <div className={`${isLoading ? 'opacity-80' : 'opacity-100'} transition-opacity duration-500`}>
                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Interview Dashboard</h1>
                        <div className="space-x-2">
                            {showStartButton && (
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={onStart}>Start Interview</button>
                            )}
                            {!showStartButton && (
                                <>
                                    <button
                                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${!showSpeakButton ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={onSpeak}
                                        disabled={!showSpeakButton}
                                    >
                                        Candidate Speak
                                    </button>
                                    <button
                                        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${!showStopButton ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={onStop}
                                        disabled={!showStopButton}
                                    >
                                        Stop
                                    </button>
                                    <button
                                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!showNextButton ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={onNext}
                                        disabled={!showNextButton}
                                    >
                                        Next
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
    
                    <div className="card-row">
                        <div className={`interviewee-card ${isInterviewerSpeaking ? 'green-border' : ''}`}>
                            <h3 className="text-gray-700">Interviewer</h3>
                            <p>{questions[currentQuestionIndex]?.question}</p>
                        </div>
                        <div className={`interviewer-card ${isCandidateSpeaking ? 'green-border' : ''}`}>
                            <h3 className="text-gray-700">Candidate</h3>
                            {/* <p>Candidate Speak...</p> */}
                            <p>{finalTranscript}</p>
                        </div>
                    </div>
                </div>
                <div>
                    {showAnswerSection && (
                        <section>
                            <div id="recording-indicator" style={{ display: 'none' }}>
                                <p>Recording...</p>
                            </div>
                            {showAnswerList.length > 0 ? (
                                <div className="table-wrapper">
                                    <h3>Interview Question/Answer</h3>
                                    <div className="table-container">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">Sr.no</th>
                                                    <th scope="col" className="px-6 py-3">Questions</th>
                                                    <th scope="col" className="px-6 py-3">Answer</th>
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
                                </div>
                            ) : (
                                <p>No answers yet</p>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
    
    

}
