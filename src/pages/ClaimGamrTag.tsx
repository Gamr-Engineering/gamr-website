import { useState, useEffect, useCallback, useRef, Component, ErrorInfo, ReactNode } from "react";
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
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
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
    ChevronsUpDown,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ALL_COUNTRIES } from "@/data/countries";

const TOTAL_STEPS = 5;
const SESSION_STORAGE_KEY = "gamr_onboarding_form_data";

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

const COUNTRIES = ALL_COUNTRIES;

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

// ProfileErrorBoundary: Prevents WSoD by catching rendering errors in success steps
class ProfileErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("[UI_CRASH_DEBUG]", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-center bg-white/5 border border-white/10 space-y-4">
                    <h2 className="text-xl font-bold uppercase tracking-tighter">Something went wrong</h2>
                    <p className="text-white/50 text-sm">We couldn't render your full profile summary, but your GamrTag has been saved!</p>
                    <Button onClick={() => window.location.reload()} variant="outline" className="rounded-none">
                        Reload Page
                    </Button>
                </div>
            );
        }
        return this.props.children;
    }
}

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
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const lastEmailCheckId = useRef(0);
    const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
    const [successProfile, setSuccessProfile] = useState<any>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const [customGameInput, setCustomGameInput] = useState("");
    const [countrySearchOpen, setCountrySearchOpen] = useState(false);
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

    // Phase 5: State Persistence - Initialize from sessionStorage
    useEffect(() => {
        const savedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setFormData(prev => ({ ...prev, ...parsed }));
                logStepEvent("Restored form data from sessionStorage");
            } catch (e) {
                console.warn("Failed to parse saved onboarding data", e);
            }
        }
    }, []);

    // Sync state to sessionStorage
    useEffect(() => {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    // Phase 5: Scroll to top on step change to prevent skipping sections
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);

    // Logger Utility
    const logStepEvent = useCallback((event: string, details?: any) => {
        console.log(`[ONBOARDING_FLOW] Step ${step}: ${event}`, details || "");
    }, [step]);

    // Schema Check on Mount
    useEffect(() => {
        const verifySchema = async () => {
            logStepEvent("Checking database schema...");
            try {
                const { data, error } = await supabase.from("gaming_profiles").select("*").limit(1);
                if (error) throw error;
                
                if (data && data.length >= 0) {
                    const columns = Object.keys(data[0] || {});
                    const required = ["phone_number", "gamer_archetypes", "play_styles", "email", "display_name"];
                    const missing = required.filter(col => !columns.includes(col));
                    
                    if (missing.length > 0) {
                        console.warn(`[SCHEMA_SECURITY] MISSING COLUMNS: ${missing.join(", ")}. Please run the consolidated migration.`);
                    } else {
                        console.log("[SCHEMA_SECURITY] Schema verification passed.");
                    }
                }
            } catch (err) {
                console.error("[SCHEMA_SECURITY] Failed to verify schema:", err);
            }
        };
        verifySchema();
    }, [logStepEvent]);

    // Debounced tag uniqueness check
    const checkTagAvailability = useCallback(async (tag: string) => {
        if (tag.length < 3) {
            setTagAvailable(null);
            return;
        }
        setIsCheckingTag(true);
        logStepEvent("Checking tag availability...", { tag });
        try {
            const { data, error } = await supabase
                .from("gaming_profiles")
                .select("gamr_tag")
                .eq("gamr_tag", tag.toLowerCase())
                .maybeSingle();

            if (error) {
                console.error("Tag check error:", error);
                if (error.code === "PGRST204" || error.message?.includes("Could not find the") || error.message?.includes("schema cache")) {
                    // Graceful degrade: assume available and let handleSubmit handle the schema fallback
                    setTagAvailable(true);
                } else {
                    setTagAvailable(null);
                    toast({
                        title: "Availability Check Failed",
                        description: "Could not verify tag. Please try again later.",
                        variant: "destructive",
                    });
                }
            } else {
                const isAvailable = data === null;
                setTagAvailable(isAvailable);
                logStepEvent("Tag availability result", { tag, isAvailable });
            }
        } catch (err) {
            console.error("Tag availability async error:", err);
            setTagAvailable(null);
        } finally {
            setIsCheckingTag(false);
        }
    }, [logStepEvent]);

    const checkEmailAvailability = useCallback(async (email: string) => {
        // Basic format check before calling backend
        if (!email.includes("@") || !email.includes(".")) {
            setEmailAvailable(null);
            return;
        }

        const requestId = ++lastEmailCheckId.current;
        setIsCheckingEmail(true);
        logStepEvent("Checking email availability...", { email, requestId });

        try {
            // Phase 3: Validation Logic Hardening - Input Guards
            const trimmed = email?.trim();
            if (!trimmed || typeof email !== "string") {
                if (requestId === lastEmailCheckId.current) {
                    setEmailAvailable(null);
                    setIsCheckingEmail(false);
                }
                return;
            }

            logStepEvent("Checking email availability...", { email: trimmed, requestId });

            let query = supabase
                .from("gaming_profiles")
                .select("id")
                .ilike("email", trimmed.toLowerCase());

            // Identity-Aware: Ignore current user's own record if they are re-validating
            if (successProfile?.id) {
                query = query.neq("id", successProfile.id);
            }

            const { data, error } = await query.maybeSingle();

            // Ignore responses from outdated requests (Race condition protection)
            if (requestId !== lastEmailCheckId.current) {
                return;
            }

            if (error) {
                console.error("Email check error:", error);
                if (error.code === "PGRST204" || error.message?.includes("Could not find the") || error.message?.includes("schema cache")) {
                    setEmailAvailable(true);
                } else {
                    setEmailAvailable(null);
                }
            } else {
                // Strict Boolean Parsing: exists is true if data is NOT null
                const exists = data !== null;
                const isAvailable = !exists;
                setEmailAvailable(isAvailable);
                logStepEvent("Email availability result", { email: trimmed, isAvailable });
            }
        } catch (err) {
            if (requestId === lastEmailCheckId.current) {
                console.warn("Email check failed (async error):", err);
                setEmailAvailable(null); // Ensure we don't block permanently on error
            }
        } finally {
            if (requestId === lastEmailCheckId.current) {
                setIsCheckingEmail(false);
            }
        }
    }, [logStepEvent]);

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

    useEffect(() => {
        const timer = setTimeout(() => {
            if (formData.email.trim() !== "") {
                checkEmailAvailability(formData.email);
            } else {
                setEmailAvailable(null);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [formData.email, checkEmailAvailability]);

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
        setFormData((prev) => ({
            ...prev,
            gamerArchetypes: prev.gamerArchetypes.includes(archetype) ? [] : [archetype]
        }));
    };

    const togglePlayStyle = (playStyle: string) => {
        setFormData((prev) => ({
            ...prev,
            playStyles: prev.playStyles.includes(playStyle) ? [] : [playStyle]
        }));
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return formData.gamrTag.length >= 3 && tagAvailable === true;
            case 2:
                // Allow continuation if email is not explicitly taken (null = checking or error)
                const isEmailValid = formData.email.trim() !== "" && emailAvailable !== false;
                const isPhoneValid = formData.phoneNumber.trim() === "" || formData.phoneNumber === "+" || isValidPhoneNumber(formData.phoneNumber);
                
                return (
                    formData.firstName.trim() !== "" &&
                    formData.lastName.trim() !== "" &&
                    isEmailValid &&
                    isPhoneValid &&
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

    useEffect(() => {
        const valid = isStepValid();
        if (valid) {
            logStepEvent("Validation PASSED for current step");
        } else {
            // Log specific reasons for invalidity in dev mode if needed
            if (step === 2) {
                const isEmailValid = formData.email.trim() !== "" && emailAvailable !== false;
                const isPhoneValid = formData.phoneNumber.trim() === "" || formData.phoneNumber === "+" || isValidPhoneNumber(formData.phoneNumber);
                if (!isEmailValid || !isPhoneValid || formData.firstName.trim() === "" || formData.lastName.trim() === "" || formData.country === "") {
                     // Silent debug log
                }
            }
        }
    }, [step, formData, tagAvailable, emailAvailable, logStepEvent]);

    const handleSubmit = async () => {
        logStepEvent("Submitting form data...");
        setIsSubmitting(true);
        
        // Phase 5: Frontend State Cleansing - Reset at beginning
        setEmailAvailable(null);
        setIsCheckingEmail(false);

        try {
            // STEP 1: Pre-flight Email Check (Check-Then-Act Pattern)
            const trimmedEmail = formData.email.trim();
            
            // Defensive: Only check if email actually has content
            if (trimmedEmail !== "") {
                const { data: existingUser, error: checkError } = await supabase
                    .from("gaming_profiles")
                    .select("id")
                    .ilike("email", trimmedEmail.toLowerCase())
                    .maybeSingle();

                if (checkError) {
                    console.error("Pre-flight check error:", checkError);
                }

                if (existingUser && existingUser.id) {
                    logStepEvent("Duplicate email detected during pre-flight", { email: trimmedEmail });
                    setEmailAvailable(false);
                    toast({
                        title: "Email already in use",
                        description: "This email is already associated with a gaming profile. Please use another email or log in.",
                        variant: "destructive",
                    });
                    setStep(2);
                    setIsSubmitting(false);
                    return;
                }
            }

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

            // Phase 4: Safe Upsert Strategy
            const { data: createdProfile, error } = await supabase
                .from("gaming_profiles")
                .upsert(profileData, { onConflict: 'email' })
                .select()
                .maybeSingle();

            if (error) {
                logStepEvent("Submission failed", { error });
                // Handle PostgREST Schema Cache desync (Error when columns are missing)
                if (error.code === "PGRST204" || error.message.includes("Could not find the") || error.message.includes("schema cache")) {
                    console.error("Schema cache error encountered. Retrying insert without array/new fields:", error);
                    
                    // Fallback: Remove the new un-cached fields and retry with upsert
                    const { gamer_archetypes, play_styles, phone_number, ...fallbackData } = profileData;
                    const fallbackResponse = await supabase
                        .from("gaming_profiles")
                        .upsert(fallbackData, { onConflict: 'email' })
                        .select()
                        .maybeSingle();
                    
                    if (fallbackResponse.error) {
                        logStepEvent("Fallback submission failed", { error: fallbackResponse.error });
                        // If it fails again, throw error as usual
                        throw fallbackResponse.error;
                    }
                    
                    logStepEvent("Fallback submission succeeded", { data: fallbackResponse.data });
                    setSuccessProfile(fallbackResponse.data);
                    // Fallback succeeded
                    setStep(5);
                    return;
                }

                // Phase 5: Status-Code Specific Conflict Handling (409 Only)
                if (error.status === 409 || error.code === "23505") {
                    const isEmailConflict = error.message.includes("gaming_profiles_email_key") || JSON.stringify(error).toLowerCase().includes("email");
                    
                    if (isEmailConflict) {
                        setEmailAvailable(false);
                        logStepEvent("Email conflict detected on submission (409)", { email: formData.email });
                        toast({
                            title: "Email already in use",
                            description: "This email is already registered. Please login or use another email.",
                            variant: "destructive",
                        });
                        setStep(2);
                        setTimeout(() => emailInputRef.current?.focus(), 100);
                    } else {
                        logStepEvent("Tag conflict detected on submission (409)", { tag: formData.gamrTag });
                        toast({
                            title: "Tag already claimed",
                            description: "This GamrTag is already in use. Please go back to Step 1 and choose another.",
                            variant: "destructive",
                        });
                        setStep(1);
                    }
                } else {
                    logStepEvent("Unexpected submission error", { error });
                    toast({
                        title: "Something went wrong",
                        description: error.message,
                        variant: "destructive",
                    });
                }
                return;
            }

            logStepEvent("Submission succeeded", { profile: createdProfile });
            setSuccessProfile(createdProfile);
            setStep(5);
        } catch (err: any) {
            logStepEvent("Unexpected async submission error", { error: err });
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
        logStepEvent("Transitioning to next step", { current: step, next: step + 1 });
        if (step === 4) {
            handleSubmit();
        } else {
            setStep((s) => Math.min(s + 1, TOTAL_STEPS));
        }
    };

    const prevStep = () => {
        logStepEvent("Transitioning to previous step", { current: step, prev: step - 1 });
        setStep((s) => Math.max(s - 1, 1));
    };

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
                                    <div className="relative">
                                        <Input
                                            ref={emailInputRef}
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setFormData((prev) => ({ ...prev, email: val }));
                                                // Immediate State Purge (Reset-on-Change)
                                                setEmailAvailable(null);
                                                setIsCheckingEmail(false);
                                                lastEmailCheckId.current++; // Invalidate pending checks
                                            }}
                                            placeholder="you@example.com"
                                            className={inputClasses}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            {isCheckingEmail && (
                                                <Loader2 className="h-5 w-5 animate-spin text-white/40" />
                                            )}
                                            {!isCheckingEmail && emailAvailable === true && (
                                                <Check className="h-5 w-5 text-green-400" />
                                            )}
                                            {!isCheckingEmail && emailAvailable === false && (
                                                <X className="h-5 w-5 text-red-400" />
                                            )}
                                        </div>
                                    </div>
                                    {emailAvailable === false && (
                                        <p className="text-xs text-red-500 mt-1 max-w-sm">
                                            This email is already registered. Please log in or use another email.
                                        </p>
                                    )}
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
                                        <Popover open={countrySearchOpen} onOpenChange={setCountrySearchOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={countrySearchOpen}
                                                    className={cn(
                                                        "w-full justify-between bg-white/5 border-white/10 text-white rounded-none h-12 focus:ring-0 focus:border-white/40 font-normal hover:bg-white/10 hover:text-white",
                                                        !formData.country && "text-white/20"
                                                    )}
                                                >
                                                    {formData.country
                                                        ? COUNTRIES.find((c) => c === formData.country)
                                                        : "Select country..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-black border-white/10 rounded-none">
                                                <Command className="bg-transparent text-white">
                                                    <CommandInput 
                                                        placeholder="Search country..." 
                                                        className="h-12 border-none focus:ring-0 bg-transparent text-white placeholder:text-white/20"
                                                    />
                                                    <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                                        <CommandEmpty className="py-6 text-center text-sm text-white/40">No country found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {COUNTRIES.map((c) => (
                                                                <CommandItem
                                                                    key={c}
                                                                    value={c}
                                                                    onSelect={(currentValue) => {
                                                                        // cmdk converts values to lowercase for internal matching, 
                                                                        // but we want the original casing. 
                                                                        // Since our COUNTRIES list is unique, we find the match.
                                                                        const selected = COUNTRIES.find(country => country.toLowerCase() === currentValue.toLowerCase()) || currentValue;
                                                                        setFormData((prev) => ({ ...prev, country: selected }));
                                                                        setCountrySearchOpen(false);
                                                                    }}
                                                                    className="text-white hover:bg-white/10 aria-selected:bg-white/10 rounded-none cursor-pointer py-3"
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            formData.country === c ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {c}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
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
                                        Choose your gamer archetype
                                    </label>
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
                                        Choose your play style
                                    </label>
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
                                    Personality Traits
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
                        <ProfileErrorBoundary>
                            <div className="space-y-10 animate-fade-in text-center">
                            <div className="space-y-6">
                                <div className="mx-auto w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                                    <Check className="h-10 w-10 text-white" />
                                </div>
                                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                                        Welcome,
                                        <br />
                                        <span className="text-white/60">@{successProfile?.gamr_tag || formData.gamrTag}</span>
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                        <div>
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                                GamrTag
                                            </p>
                                            <p className="font-bold">@{successProfile?.gamr_tag || formData.gamrTag || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                                Name
                                            </p>
                                            <p className="font-bold">
                                                {successProfile?.first_name || formData.firstName} {successProfile?.last_name || formData.lastName}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                                Email
                                            </p>
                                            <p className="font-bold">{successProfile?.email || formData.email || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                                Platform
                                            </p>
                                            <p className="font-bold">{successProfile?.platform || formData.platform || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                                Region
                                            </p>
                                            <p className="font-bold">{successProfile?.gaming_region || formData.gamingRegion || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                                <MapPin className="h-3 w-3 inline mr-1" />
                                                Location
                                            </p>
                                            <p className="font-bold">
                                                {successProfile?.city ? `${successProfile.city}, ` : (formData.city ? `${formData.city}, ` : "")}
                                                {successProfile?.country || formData.country || "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                                Archetype
                                            </p>
                                            <p className="font-bold">
                                                {((successProfile?.gamer_archetypes || formData.gamerArchetypes) || []).length > 0
                                                    ? (successProfile?.gamer_archetypes || formData.gamerArchetypes).map((id: string) => GAMER_ARCHETYPES.find(a => a.id === id)?.label || id).join(", ")
                                                    : "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
                                                Play Style
                                            </p>
                                            <p className="font-bold">
                                                {((successProfile?.play_styles || formData.playStyles) || []).length > 0
                                                    ? (successProfile?.play_styles || formData.playStyles).map((id: string) => PLAY_STYLES.find(s => s.id === id)?.label || id).join(", ")
                                                    : "N/A"}
                                            </p>
                                        </div>
                                        <div className="col-span-1 md:col-span-2">
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                                                Games
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {(successProfile?.favorite_games || formData.favoriteGames || []).map((game: string) => (
                                                    <Badge
                                                        key={game}
                                                        className="bg-white/10 text-white border-0 rounded-none px-3 py-1 text-xs"
                                                    >
                                                        {game}
                                                    </Badge>
                                                ))}
                                                {(successProfile?.favorite_games || formData.favoriteGames || []).length === 0 && <span className="text-white/30 italic">None</span>}
                                            </div>
                                        </div>
                                        <div className="col-span-1 md:col-span-2">
                                            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                                                Traits
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {(successProfile?.personality_traits || formData.personalityTraits || []).map((trait: string) => (
                                                    <Badge
                                                        key={trait}
                                                        className="bg-white/10 text-white border-0 rounded-none px-3 py-1 text-xs"
                                                    >
                                                        {trait}
                                                    </Badge>
                                                ))}
                                                {(successProfile?.personality_traits || formData.personalityTraits || []).length === 0 && <span className="text-white/30 italic">None</span>}
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
                        </ProfileErrorBoundary>
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
                                disabled={
                                    !isStepValid() || 
                                    isSubmitting || 
                                    (step === 1 && isCheckingTag) || 
                                    (step === 2 && isCheckingEmail)
                                }
                                className="bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 rounded-none px-10 py-6 text-sm font-bold uppercase tracking-widest transition-all duration-300"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting
                                    </>
                                ) : (step === 1 && isCheckingTag) || (step === 2 && isCheckingEmail) ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Checking
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
