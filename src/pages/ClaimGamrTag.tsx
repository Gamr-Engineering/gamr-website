import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    X,
    Loader2,
    Gamepad2,
    User,
    Trophy,
    Sparkles,
    MapPin,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TOTAL_STEPS = 5;

const POPULAR_GAMES = [
    "FIFA / EA FC",
    "Call of Duty",
    "Fortnite",
    "Apex Legends",
    "Valorant",
    "League of Legends",
    "PUBG",
    "Mortal Kombat",
    "Street Fighter",
    "Tekken",
    "Rocket League",
    "Minecraft",
    "GTA V",
    "NBA 2K",
    "Madden NFL",
    "Overwatch 2",
    "Counter-Strike 2",
    "Dota 2",
    "Rainbow Six Siege",
    "Halo Infinite",
];

const PLATFORMS = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile", "Multi-Platform"];

const REGIONS = [
    "West Africa",
    "East Africa",
    "Southern Africa",
    "North Africa",
    "Central Africa",
    "Global",
];

const COUNTRIES = [
    "Nigeria",
    "South Africa",
    "Kenya",
    "Ghana",
    "Egypt",
    "Morocco",
    "Tanzania",
    "Ethiopia",
    "Cameroon",
    "Senegal",
    "Rwanda",
    "Uganda",
    "Algeria",
    "Tunisia",
    "Côte d'Ivoire",
    "Mozambique",
    "Zimbabwe",
    "Other",
];

const GAMER_ARCHETYPES = [
    { id: "competitor", label: "Competitor", desc: "Lives for the win. Ranked modes are home." },
    { id: "explorer", label: "Explorer", desc: "Discovers every hidden corner and secret." },
    { id: "socializer", label: "Socializer", desc: "It's all about the squad and community." },
    { id: "achiever", label: "Achiever", desc: "100% completion or it didn't happen." },
];

const PLAY_STYLES = [
    { id: "casual", label: "Casual", desc: "Plays for fun, no pressure" },
    { id: "hardcore", label: "Hardcore", desc: "All in, all the time" },
    { id: "speedrunner", label: "Speedrunner", desc: "Against the clock" },
    { id: "streamer", label: "Streamer", desc: "Plays for an audience" },
    { id: "content-creator", label: "Content Creator", desc: "Creates gaming content" },
    { id: "pro", label: "Pro / Semi-Pro", desc: "Competing at the highest level" },
];

const PERSONALITY_TRAITS = [
    "Team Player",
    "Solo Wolf",
    "Strategist",
    "Aggressor",
    "Support Main",
    "Shot Caller",
    "Clutch Player",
    "Late-Night Grinder",
    "Theory Crafter",
    "Trash Talker",
    "Silent Assassin",
    "Mentor",
];

interface FormData {
    gamrTag: string;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    bio: string;
    city: string;
    country: string;
    favoriteGames: string[];
    platform: string;
    gamingRegion: string;
    gamerArchetypes: string[];
    playStyles: string[];
    personalityTraits: string[];
}

const ClaimGamrTag = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCheckingTag, setIsCheckingTag] = useState(false);
    const [tagAvailable, setTagAvailable] = useState<boolean | null>(null);
    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const [customGameInput, setCustomGameInput] = useState("");
    const [formData, setFormData] = useState<FormData>({
        gamrTag: "",
        firstName: "",
        lastName: "",
        displayName: "",
        email: "",
        phoneNumber: "",
        bio: "",
        city: "",
        country: "",
        favoriteGames: [],
        platform: "",
        gamingRegion: "",
        gamerArchetypes: [],
        playStyles: [],
        personalityTraits: [],
    });

    const { toast } = useToast();
    const navigate = useNavigate();

    // Debounced tag uniqueness check
    const checkTagAvailability = useCallback(async (tag: string) => {
        if (tag.length < 3) {
            setTagAvailable(null);
            return;
        }
        setIsCheckingTag(true);
        try {
            const { data, error } = await supabase
                .from("gaming_profiles")
                .select("gamr_tag")
                .eq("gamr_tag", tag.toLowerCase())
                .maybeSingle();

            if (error) {
                console.error("Tag check error:", error);
                setTagAvailable(null);
            } else {
                setTagAvailable(data === null);
            }
        } catch {
            setTagAvailable(null);
        } finally {
            setIsCheckingTag(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (formData.gamrTag.length >= 3) {
                checkTagAvailability(formData.gamrTag);
            } else {
                setTagAvailable(null);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [formData.gamrTag, checkTagAvailability]);

    const handleAddCustomGame = () => {
        const trimmed = customGameInput.trim();
        if (!trimmed) return;

        const existingGame = POPULAR_GAMES.find(g => g.toLowerCase() === trimmed.toLowerCase()) || trimmed;
        
        if (formData.favoriteGames.some(g => g.toLowerCase() === trimmed.toLowerCase())) {
            setCustomGameInput("");
            return;
        }

        if (formData.favoriteGames.length >= 5) {
            toast({
                title: "Limit Reached",
                description: "You can only select up to 5 favorite games.",
                variant: "destructive",
            });
            return;
        }

        setFormData(prev => ({
            ...prev,
            favoriteGames: [...prev.favoriteGames, existingGame]
        }));
        setCustomGameInput("");
    };

    const toggleGame = (game: string) => {
        setFormData((prev) => {
            if (prev.favoriteGames.includes(game)) {
                return { ...prev, favoriteGames: prev.favoriteGames.filter((g) => g !== game) };
            }
            if (prev.favoriteGames.length >= 5) {
                toast({
                    title: "Limit Reached",
                    description: "You can only select up to 5 favorite games.",
                    variant: "destructive",
                });
                return prev;
            }
            return { ...prev, favoriteGames: [...prev.favoriteGames, game] };
        });
    };

    const toggleTrait = (trait: string) => {
        setFormData((prev) => ({
            ...prev,
            personalityTraits: prev.personalityTraits.includes(trait)
                ? prev.personalityTraits.filter((t) => t !== trait)
                : prev.personalityTraits.length < 4
                    ? [...prev.personalityTraits, trait]
                    : prev.personalityTraits,
        }));
    };

    const toggleArchetype = (archetype: string) => {
        setFormData((prev) => {
            if (prev.gamerArchetypes.includes(archetype)) {
                return { ...prev, gamerArchetypes: prev.gamerArchetypes.filter((a) => a !== archetype) };
            }
            if (prev.gamerArchetypes.length >= 2) {
                toast({
                    title: "Limit Reached",
                    description: "You can only select up to 2 archetypes.",
                    variant: "destructive",
                });
                return prev;
            }
            return { ...prev, gamerArchetypes: [...prev.gamerArchetypes, archetype] };
        });
    };

    const togglePlayStyle = (playStyle: string) => {
        setFormData((prev) => {
            if (prev.playStyles.includes(playStyle)) {
                return { ...prev, playStyles: prev.playStyles.filter((s) => s !== playStyle) };
            }
            if (prev.playStyles.length >= 2) {
                toast({
                    title: "Limit Reached",
                    description: "You can only select up to 2 play styles.",
                    variant: "destructive",
                });
                return prev;
            }
            return { ...prev, playStyles: [...prev.playStyles, playStyle] };
        });
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return formData.gamrTag.length >= 3 && tagAvailable === true;
            case 2:
                return (
                    formData.firstName.trim() !== "" &&
                    formData.lastName.trim() !== "" &&
                    formData.email.trim() !== "" &&
                    formData.phoneNumber.trim() !== "" &&
                    isValidPhoneNumber(formData.phoneNumber) &&
                    formData.country !== ""
                );
            case 3:
                return (
                    formData.favoriteGames.length > 0 &&
                    formData.platform !== "" &&
                    formData.gamingRegion !== ""
                );
            case 4:
                return (
                    formData.gamerArchetypes.length > 0 &&
                    formData.playStyles.length > 0 &&
                    formData.personalityTraits.length > 0
                );
            default:
                return true;
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const profileData = {
                gamr_tag: formData.gamrTag.toLowerCase(),
                first_name: formData.firstName,
                last_name: formData.lastName,
                display_name: formData.displayName || `${formData.firstName} ${formData.lastName}`,
                email: formData.email.toLowerCase(),
                phone_number: formData.phoneNumber,
                bio: formData.bio || null,
                city: formData.city || null,
                country: formData.country,
                favorite_games: formData.favoriteGames,
                platform: formData.platform,
                gaming_region: formData.gamingRegion,
                // Backward compatibility for single string fields
                gamer_archetype: formData.gamerArchetypes[0] || "Competitor", 
                play_style: formData.playStyles[0] || "Casual",
                personality_traits: formData.personalityTraits,
                // New multi-select array fields
                gamer_archetypes: formData.gamerArchetypes,
                play_styles: formData.playStyles,
            };

            const { error } = await supabase.from("gaming_profiles").insert(profileData);

            if (error) {
                // Handle PostgREST Schema Cache desync (Error when columns are missing)
                if (error.code === "PGRST204" || error.message.includes("Could not find the") || error.message.includes("schema cache")) {
                    console.error("Schema cache error encountered. Retrying insert without array/new fields:", error);
                    
                    // Fallback: Remove the new un-cached fields and retry
                    const { gamer_archetypes, play_styles, phone_number, ...fallbackData } = profileData;
                    const fallbackResponse = await supabase.from("gaming_profiles").insert(fallbackData);
                    
                    if (fallbackResponse.error) {
                        // If it fails again, throw error as usual
                        throw fallbackResponse.error;
                    }
                    
                    // Fallback succeeded
                    setStep(5);
                    return;
                }

                if (error.code === "23505") {
                    toast({
                        title: "Tag already claimed",
                        description:
                            "This GamrTag or email is already in use. Please go back and choose another.",
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Something went wrong",
                        description: error.message,
                        variant: "destructive",
                    });
                }
                return;
            }

            setStep(5);
        } catch (err: any) {
            toast({
                title: "Something went wrong",
                description: err?.message || "Please check your connection and try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        if (step === 4) {
            handleSubmit();
        } else {
            setStep((s) => Math.min(s + 1, TOTAL_STEPS));
        }
    };

    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const inputClasses =
        "bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-none h-12 focus:border-white/40 focus:ring-0";
    const labelClasses = "text-xs font-bold uppercase tracking-widest text-white/60";
    const selectTriggerClasses =
        "bg-white/5 border-white/10 text-white rounded-none h-12 focus:ring-0 focus:border-white/40";
    const selectContentClasses = "bg-black border-white/10 rounded-none";
    const selectItemClasses = "text-white focus:bg-white/10 focus:text-white rounded-none";

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm font-bold uppercase tracking-widest">Back</span>
                    </Link>
                    <span className="text-sm font-bold uppercase tracking-widest text-white/40">
                        Claim Your GamrTag
                    </span>
                    <div className="w-20" />
                </div>
            </div>

            {/* Progress Bar */}
            {step < 5 && (
                <div className="fixed top-[57px] left-0 right-0 z-40">
                    <div className="h-[2px] bg-white/10 w-full">
                        <div
                            className="h-full bg-white transition-all duration-500 ease-out"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 max-w-xl">
                    {/* ==================== STEP 1: CLAIM YOUR TAG ==================== */}
                    {step === 1 && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                                    <Gamepad2 className="h-4 w-4" />
                                    Step 1 of 4
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                                    Claim Your
                                    <br />
                                    GamrTag
                                </h1>
                                <p className="text-white/50 text-base max-w-md">
                                    Your GamrTag is your unique identity across the GAMR ecosystem. Choose wisely —
                                    it's how the community will know you.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-bold text-lg">
                                        @
                                    </span>
                                    <Input
                                        value={formData.gamrTag}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                gamrTag: e.target.value.replace(/[^a-zA-Z0-9_]/g, ""),
                                            }))
                                        }
                                        placeholder="your-gamr-tag"
                                        maxLength={20}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-none h-14 pl-10 text-lg font-mono focus:border-white/40 focus:ring-0 transition-colors"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        {isCheckingTag && (
                                            <Loader2 className="h-5 w-5 animate-spin text-white/40" />
                                        )}
                                        {!isCheckingTag && tagAvailable === true && (
                                            <Check className="h-5 w-5 text-green-400" />
                                        )}
                                        {!isCheckingTag && tagAvailable === false && (
                                            <X className="h-5 w-5 text-red-400" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-white/30">
                                        {tagAvailable === false
                                            ? "This tag is already taken. Try another."
                                            : tagAvailable === true
                                                ? "This tag is available!"
                                                : "Min 3 characters. Letters, numbers, underscores only."}
                                    </p>
                                    <p className="text-xs text-white/30">{formData.gamrTag.length}/20</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== STEP 2: ABOUT YOU ==================== */}
                    {step === 2 && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                                    <User className="h-4 w-4" />
                                    Step 2 of 4
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                                    About
                                    <br />
                                    You
                                </h1>
                                <p className="text-white/50 text-base max-w-md">
                                    Let's get to know the person behind the GamrTag.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Name Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <label className={labelClasses}>First Name</label>
                                        <Input
                                            value={formData.firstName}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
                                            }
                                            placeholder="First name"
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className={labelClasses}>Last Name</label>
                                        <Input
                                            value={formData.lastName}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                                            }
                                            placeholder="Last name"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>

                                {/* Display Name */}
                                <div className="space-y-3">
                                    <label className={labelClasses}>
                                        Display Name <span className="text-white/30">(Optional)</span>
                                    </label>
                                    <Input
                                        value={formData.displayName}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, displayName: e.target.value }))
                                        }
                                        placeholder="Defaults to your full name"
                                        className={inputClasses}
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-3">
                                    <label className={labelClasses}>Email Address</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                                        }
                                        placeholder="you@example.com"
                                        className={inputClasses}
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-3">
                                    <label className={labelClasses}>Phone Number</label>
                                    <div className="relative">
                                        <PhoneInput
                                            country={"ng"}
                                            value={formData.phoneNumber}
                                            onChange={(phone) =>
                                                setFormData((prev) => ({ 
                                                    ...prev, 
                                                    phoneNumber: phone ? (phone.startsWith("+") ? phone : `+${phone}`) : "" 
                                                }))
                                            }
                                            enableSearch={true}
                                            disableSearchIcon={true}
                                            searchPlaceholder="Search country..."
                                            containerClass="w-full"
                                            inputClass="!w-full !bg-white/5 !border-white/10 !text-white !h-12 !rounded-none focus:!border-white/40 focus:!ring-0 placeholder:!text-white/20 !pl-[48px] !font-sans !text-[14px]"
                                            buttonClass="!bg-transparent !border-white/10 !border-r-0 !rounded-none hover:!bg-white/5"
                                            dropdownClass="!bg-black !border-white/10 !text-white !rounded-none custom-phone-dropdown"
                                            searchClass="!bg-white/5 !text-white !border-white/10 !w-[calc(100%-20px)] !mx-auto !mt-2 !mb-2 !p-2 !h-10 focus:!border-white/40 !rounded-none"
                                        />
                                    </div>
                                    {formData.phoneNumber && formData.phoneNumber !== "+" && !isValidPhoneNumber(formData.phoneNumber) && (
                                        <p className="text-xs text-red-400">Please enter a valid phone number</p>
                                    )}
                                </div>

                                {/* Location Row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <label className={labelClasses}>
                                            City <span className="text-white/30">(Optional)</span>
                                        </label>
                                        <Input
                                            value={formData.city}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, city: e.target.value }))
                                            }
                                            placeholder="Lagos, Nairobi..."
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className={labelClasses}>Country</label>
                                        <Select
                                            value={formData.country}
                                            onValueChange={(val) =>
                                                setFormData((prev) => ({ ...prev, country: val }))
                                            }
                                        >
                                            <SelectTrigger className={selectTriggerClasses}>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className={selectContentClasses}>
                                                {COUNTRIES.map((c) => (
                                                    <SelectItem key={c} value={c} className={selectItemClasses}>
                                                        {c}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="space-y-3">
                                    <label className={labelClasses}>
                                        Bio <span className="text-white/30">(Optional)</span>
                                    </label>
                                    <Textarea
                                        value={formData.bio}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, bio: e.target.value }))
                                        }
                                        placeholder="Tell the community about yourself..."
                                        maxLength={200}
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-none min-h-[100px] focus:border-white/40 focus:ring-0 resize-none"
                                    />
                                    <p className="text-xs text-white/30 text-right">
                                        {formData.bio.length}/200
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== STEP 3: GAMING PROFILE ==================== */}
                    {step === 3 && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                                    <Trophy className="h-4 w-4" />
                                    Step 3 of 4
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                                    Gaming
                                    <br />
                                    Profile
                                </h1>
                                <p className="text-white/50 text-base max-w-md">
                                    Tell us about your gaming life. This helps us connect you with the right
                                    communities and tournaments.
                                </p>
                            </div>

                            {/* Favorite Games */}
                            <div className="space-y-4">
                                <label className={labelClasses}>
                                    Favorite Games ({formData.favoriteGames.length}/5)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from(new Set([...POPULAR_GAMES, ...formData.favoriteGames])).map((game) => {
                                        const selected = formData.favoriteGames.includes(game);
                                        return (
                                            <Badge
                                                key={game}
                                                variant={selected ? "default" : "outline"}
                                                className={`cursor-pointer rounded-none px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${selected
                                                        ? "bg-white text-black border-white hover:bg-white/90"
                                                        : "bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white"
                                                    }`}
                                                onClick={() => toggleGame(game)}
                                            >
                                                {game}
                                            </Badge>
                                        );
                                    })}
                                    
                                    {/* "Other" Option */}
                                    <Badge
                                        variant={isOtherSelected ? "default" : "outline"}
                                        className={`cursor-pointer rounded-none px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${isOtherSelected
                                                ? "bg-white text-black border-white hover:bg-white/90"
                                                : "bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white"
                                            }`}
                                        onClick={() => setIsOtherSelected(!isOtherSelected)}
                                    >
                                        Other
                                    </Badge>
                                </div>
                                
                                {/* Dynamic Input Field for Custom Game */}
                                {isOtherSelected && (
                                    <div className="pt-2 animate-fade-in">
                                        <Input
                                            value={customGameInput}
                                            onChange={(e) => setCustomGameInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    handleAddCustomGame();
                                                }
                                            }}
                                            placeholder="Type your game name"
                                            className={inputClasses}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Platform */}
                            <div className="space-y-3">
                                <label className={labelClasses}>Primary Platform</label>
                                <Select
                                    value={formData.platform}
                                    onValueChange={(val) =>
                                        setFormData((prev) => ({ ...prev, platform: val }))
                                    }
                                >
                                    <SelectTrigger className={selectTriggerClasses}>
                                        <SelectValue placeholder="Select your platform" />
                                    </SelectTrigger>
                                    <SelectContent className={selectContentClasses}>
                                        {PLATFORMS.map((p) => (
                                            <SelectItem key={p} value={p} className={selectItemClasses}>
                                                {p}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Region */}
                            <div className="space-y-3">
                                <label className={labelClasses}>Gaming Region</label>
                                <Select
                                    value={formData.gamingRegion}
                                    onValueChange={(val) =>
                                        setFormData((prev) => ({ ...prev, gamingRegion: val }))
                                    }
                                >
                                    <SelectTrigger className={selectTriggerClasses}>
                                        <SelectValue placeholder="Select your region" />
                                    </SelectTrigger>
                                    <SelectContent className={selectContentClasses}>
                                        {REGIONS.map((r) => (
                                            <SelectItem key={r} value={r} className={selectItemClasses}>
                                                {r}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* ==================== STEP 4: PERSONALITY ==================== */}
                    {step === 4 && (
                        <div className="space-y-10 animate-fade-in">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                                    <Sparkles className="h-4 w-4" />
                                    Step 4 of 4
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                                    Your Gamer
                                    <br />
                                    DNA
                                </h1>
                                <p className="text-white/50 text-base max-w-md">
                                    What kind of gamer are you? This helps us match you with like-minded players.
                                </p>
                            </div>

                            {/* Gamer Archetype */}
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClasses}>
                                        Gamer Archetype ({formData.gamerArchetypes.length}/2)
                                    </label>
                                    <p className="text-white/30 text-xs mt-1">Select up to 2 archetypes</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {GAMER_ARCHETYPES.map((arch) => {
                                        const selected = formData.gamerArchetypes.includes(arch.id);
                                        return (
                                            <button
                                                key={arch.id}
                                                type="button"
                                                onClick={() => toggleArchetype(arch.id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        toggleArchetype(arch.id);
                                                    }
                                                }}
                                                aria-pressed={selected}
                                                className={`p-4 border text-left transition-all duration-200 ${selected
                                                        ? "bg-white text-black border-white"
                                                        : "bg-white/5 text-white border-white/10 hover:border-white/30"
                                                    }`}
                                            >
                                                <p className="font-bold text-sm uppercase tracking-wider">
                                                    {arch.label}
                                                </p>
                                                <p
                                                    className={`text-xs mt-1 ${selected ? "text-black/60" : "text-white/40"
                                                        }`}
                                                >
                                                    {arch.desc}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Play Style */}
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClasses}>
                                        Play Style ({formData.playStyles.length}/2)
                                    </label>
                                    <p className="text-white/30 text-xs mt-1">Select up to 2 play styles</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {PLAY_STYLES.map((style) => {
                                        const selected = formData.playStyles.includes(style.id);
                                        return (
                                            <button
                                                key={style.id}
                                                type="button"
                                                onClick={() => togglePlayStyle(style.id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        togglePlayStyle(style.id);
                                                    }
                                                }}
                                                aria-pressed={selected}
                                                className={`p-4 border text-left transition-all duration-200 ${selected
                                                        ? "bg-white text-black border-white"
                                                        : "bg-white/5 text-white border-white/10 hover:border-white/30"
                                                    }`}
                                            >
                                                <p className="font-bold text-sm uppercase tracking-wider">
                                                    {style.label}
                                                </p>
                                                <p
                                                    className={`text-xs mt-1 ${selected ? "text-black/60" : "text-white/40"
                                                        }`}
                                                >
                                                    {style.desc}
                                                </p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Personality Traits */}
                            <div className="space-y-4">
                                <label className={labelClasses}>
                                    Personality Traits ({formData.personalityTraits.length}/4)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {PERSONALITY_TRAITS.map((trait) => {
                                        const selected = formData.personalityTraits.includes(trait);
                                        return (
                                            <Badge
                                                key={trait}
                                                variant={selected ? "default" : "outline"}
                                                className={`cursor-pointer rounded-none px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${selected
                                                        ? "bg-white text-black border-white hover:bg-white/90"
                                                        : "bg-transparent text-white/50 border-white/20 hover:border-white/50 hover:text-white"
                                                    }`}
                                                onClick={() => toggleTrait(trait)}
                                            >
                                                {trait}
                                            </Badge>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== STEP 5: CONFIRMATION ==================== */}
                    {step === 5 && (
                        <div className="space-y-10 animate-fade-in text-center">
                            <div className="space-y-6">
                                <div className="mx-auto w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                                    <Check className="h-10 w-10 text-white" />
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                                    Welcome,
                                    <br />
                                    <span className="text-white/60">@{formData.gamrTag}</span>
                                </h1>
                                <p className="text-white/50 text-base max-w-md mx-auto">
                                    Your GamrTag has been claimed. You're now part of the future of African
                                    gaming.
                                </p>
                            </div>

                            {/* Profile Summary */}
                            <div className="bg-white/5 border border-white/10 p-8 space-y-6 text-left">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
                                    Your Profile
                                </h3>
                                <div className="grid grid-cols-2 gap-6 text-sm">
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                            GamrTag
                                        </p>
                                        <p className="font-bold">@{formData.gamrTag}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                            Name
                                        </p>
                                        <p className="font-bold">
                                            {formData.firstName} {formData.lastName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                            Platform
                                        </p>
                                        <p className="font-bold">{formData.platform}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                            Region
                                        </p>
                                        <p className="font-bold">{formData.gamingRegion}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                            <MapPin className="h-3 w-3 inline mr-1" />
                                            Location
                                        </p>
                                        <p className="font-bold">
                                            {formData.city ? `${formData.city}, ` : ""}
                                            {formData.country}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                            Archetype
                                        </p>
                                        <p className="font-bold capitalize">{formData.gamerArchetype}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                                            Games
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.favoriteGames.map((game) => (
                                                <Badge
                                                    key={game}
                                                    className="bg-white/10 text-white border-0 rounded-none px-3 py-1 text-xs"
                                                >
                                                    {game}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                                            Traits
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.personalityTraits.map((trait) => (
                                                <Badge
                                                    key={trait}
                                                    className="bg-white/10 text-white border-0 rounded-none px-3 py-1 text-xs"
                                                >
                                                    {trait}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="bg-white text-black hover:bg-white/90 rounded-none px-10 py-7 text-sm font-bold uppercase tracking-widest transition-all duration-300 w-full"
                                onClick={() => navigate("/")}
                            >
                                Return to Home
                            </Button>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {step < 5 && (
                        <div className="flex items-center justify-between pt-12">
                            {step > 1 ? (
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    className="text-white/50 hover:text-white hover:bg-transparent rounded-none px-0 text-sm font-bold uppercase tracking-widest"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>
                            ) : (
                                <div />
                            )}
                            <Button
                                onClick={nextStep}
                                disabled={!isStepValid() || isSubmitting}
                                className="bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 rounded-none px-10 py-6 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting
                                    </>
                                ) : step === 4 ? (
                                    <>
                                        Claim GamrTag
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClaimGamrTag;
