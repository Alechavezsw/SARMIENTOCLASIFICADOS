import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';

interface RadioPlayerProps {
    compact?: boolean;
}

export const RadioPlayer: React.FC<RadioPlayerProps> = ({ compact = false }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(100);
    const audioRef = useRef<HTMLAudioElement>(null);

    // URL de radio de rock argentino - Rock & Pop o similar
    // Usando una radio de rock argentino disponible online
    // Alternativas: Rock & Pop, Vorterix, Radio Nacional Rock
    const radioUrl = 'https://playerservices.streamtheworld.com/api/livestream-redirect/ROCK_AND_POP.mp3';

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => {
                    console.error('Error playing radio:', err);
                    // Si falla, intentar con otra URL
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0) {
            setIsMuted(false);
        }
    };

    if (compact) {
        return (
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 text-white shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            {isPlaying ? (
                                <Pause className="w-5 h-5" />
                            ) : (
                                <Play className="w-5 h-5 ml-0.5" />
                            )}
                        </button>
                        <div>
                            <p className="font-bold text-sm">Radio SW</p>
                            <p className="text-xs text-purple-100">Rock Argentino</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleMute}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                            {isMuted ? (
                                <VolumeX className="w-4 h-4" />
                            ) : (
                                <Volume2 className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
                <audio ref={audioRef} src={radioUrl} preload="none" />
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                        <Radio className="w-8 h-8 lg:w-10 lg:h-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl lg:text-3xl font-black mb-1">Radio SW</h3>
                        <p className="text-purple-100 font-semibold">Rock Argentino en Vivo</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all shadow-lg"
                    >
                        {isPlaying ? (
                            <Pause className="w-8 h-8 lg:w-10 lg:h-10" />
                        ) : (
                            <Play className="w-8 h-8 lg:w-10 lg:h-10 ml-1" />
                        )}
                    </button>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold">Volumen</span>
                            <span className="text-sm font-bold">{volume}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>
                    <button
                        onClick={toggleMute}
                        className="w-12 h-12 lg:w-14 lg:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                        {isMuted ? (
                            <VolumeX className="w-6 h-6 lg:w-7 lg:h-7" />
                        ) : (
                            <Volume2 className="w-6 h-6 lg:w-7 lg:h-7" />
                        )}
                    </button>
                </div>

                {isPlaying && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                        <p className="text-sm font-semibold text-purple-100">🎵 En Vivo</p>
                        <p className="text-xs text-purple-200 mt-1">Rock Argentino • 24/7</p>
                    </div>
                )}
            </div>
            <audio ref={audioRef} src={radioUrl} preload="none" />
        </div>
    );
};

