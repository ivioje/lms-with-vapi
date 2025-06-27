'use client';

import {useEffect, useRef, useState} from 'react'
import {cn, configureAssistant, getSubjectColor} from "@/lib/utils";
import {vapi} from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import { CompanionComponentProps, SavedMessage } from '@/types';
import {addToSessionHistory} from "@/lib/actions/companion.actions";
import toast from 'react-hot-toast';

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}


const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice, companionDuration }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const [timeLeft, setTimeLeft] = useState(companionDuration * 60);

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const transcriptEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (callStatus === CallStatus.ACTIVE && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeLeft === 0 && callStatus === CallStatus.ACTIVE) {
            handleDisconnect();
        }
    }, [callStatus, timeLeft]);

    useEffect(() => {
        if(lottieRef) {
            if(isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    useEffect(() => {
        const onCallStart = () => {
            toast.success('Session started')
            setTimeLeft(companionDuration * 60);
            setCallStatus(CallStatus.ACTIVE);
        }

        const onCallEnd = () => {
            toast.success('Session ended')
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(companionId)
            setTimeLeft(0);
        }

        const onMessage = (message: Message) => {
            if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages(prevMessages => [...prevMessages, newMessage]);
                console.log('message:', messages);
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, [companionId, messages, companionDuration]);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error - voice and style are not used in the assistantOverrides
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <section className="flex flex-col h-[80vh] w-full">
            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section">
                    <div className="companion-avatar" style={{ backgroundColor: getSubjectColor(subject)}}>
                        <div
                            className={
                            cn(
                                'absolute transition-opacity duration-1000', 
                                callStatus === CallStatus.FINISHED 
                                || callStatus === CallStatus.INACTIVE ? 'opacity-1001' : 'opacity-0', 
                                callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                            )
                        }>
                            <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className="max-sm:w-fit" />
                        </div>

                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100': 'opacity-0')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl">{name}</p>
                    <button className={cn(
                            'rounded-lg py-2 cursor-pointer transition-colors w-full text-white', 
                            callStatus ===CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', 
                            callStatus === CallStatus.CONNECTING && 'animate-pulse')} 
                            onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                        >
                        {callStatus === CallStatus.ACTIVE
                        ? "End Session"
                        : callStatus === CallStatus.CONNECTING
                            ? 'Connecting'
                        : 'Start Session'
                        }
                    </button>
                </div>

                <div className="user-section">
                    <div className="user-avatar">
                        <Image src={userImage} alt={userName} width={130} height={130} className="rounded-lg" />
                        <p className="font-bold text-2xl">
                            {userName}
                        </p>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <button className="btn-mic disabled:opacity-50 disabled:cursor-not-allowed" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                            <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt="mic" width={36} height={36} />
                            <p className="max-sm:hidden">
                                {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                            </p>
                        </button>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className="flex items-center justify-center gap-2 font-bold text-xl">
                                <Image src="/icons/clock.svg" alt="clock" width={20} height={20} />
                                {formatTime(timeLeft)}
                            </div>
                            <button className={cn(
                                'rounded-lg py-2 cursor-pointer transition-colors w-full text-white', 
                                callStatus ===CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', 
                                callStatus === CallStatus.CONNECTING && 'animate-pulse')} 
                                onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                            >
                            {callStatus === CallStatus.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatus.CONNECTING
                                ? 'Connecting'
                            : 'Start Session'
                            }
                        </button>
                        </div>
                    </div>
                </div>
            </section>

            {messages.length > 0 &&
            <section className="flex-grow transcript bg-gray-100 p-4 rounded-lg mt-8 overflow-hidden">
                <div className="transcript-message h-full overflow-y-auto pr-2">
                    {messages.map((message, index) => {
                        if(message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm mb-3">
                                    <b>{name.split(' ')[0].replace(/[.,]/g, '')}:</b> {message.content}
                                </p>
                            )
                        } else {
                            return <p key={index} className="max-sm:text-sm mb-3">
                                    <b>{userName}:</b> {message.content}
                            </p>
                        }
                    })}
                    <div ref={transcriptEndRef} />
                </div>
            </section>
            }
        </section>
    )
}

export default CompanionComponent