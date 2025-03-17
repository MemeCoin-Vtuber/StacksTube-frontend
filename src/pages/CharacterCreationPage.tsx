import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import character images
import char1 from '@/assets/char1.jpeg'
import char2 from '@/assets/char2.jpeg'
import char3 from '@/assets/char3.jpeg'
import char4 from '@/assets/char4.jpeg'
import f1 from '@/assets/1f.png'
import f2 from '@/assets/2f.png'

interface CharacterCreationPageProps {
  connectWallet: () => Promise<void>;
  initialTokenData: {
    name: string;
    symbol: string;
    contractAddress: string;
    chain: string;
    description: string;
    website: string;
    twitter: string;
    telegram: string;
    discord: string;
    email: string;
  } | null;
}

type CharacterType = "vtuber" | "custom";
type VoiceType = "male" | "female" | "robot" | "custom";
type PersonalityType =
  | "friendly"
  | "sarcastic"
  | "energetic"
  | "calm"
  | "informative"
  | "custom";

const CharacterCreationPage = ({
  initialTokenData,
}: CharacterCreationPageProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [characterType, setCharacterType] = useState<CharacterType>("vtuber");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);
  const [customImage, setCustomImage] = useState<File | null>(null);
  const [customImagePreview, setCustomImagePreview] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [youtubeStreamKey, setYoutubeStreamKey] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Try to get token data from location state (would be passed from ListTokenPage)
  const tokenData = location.state?.tokenData ||
    initialTokenData || { name: "", symbol: "" };

  // Character name is automatically derived from token name
  const [characterName] = useState(
    tokenData.name ? `${tokenData.name} Character` : ""
  );
  const [voiceType, setVoiceType] = useState<VoiceType>("male");
  const [personalityType, setPersonalityType] =
    useState<PersonalityType>("friendly");
  const [customPersonality, setCustomPersonality] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // First wait 4 seconds
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Then start countdown
      let count = 1;
      setRedirectCountdown(count);
      
      const timer = setInterval(() => {
        count--;
        setRedirectCountdown(count);
        
        if (count === 0) {
          clearInterval(timer);
          navigate('/dashboard');
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error creating character:', error);
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const templates = [
    { id: 1, image: char1, name: "Sakura Spirit" },
    { id: 2, image: char2, name: "Neo Knight" },
    { id: 3, image: char3, name: "Cyber Ninja" },
    { id: 4, image: char4, name: "Luna Mage" },
    { id: 5, image: f1, name: "Shadow Walker" },
    { id: 6, image: f2, name: "Crystal Guardian" },
  ];

  return (
    <section className="bg-blue-dark bg-pattern pt-24 pb-20">
      <div className="container max-w-[800px] mx-auto px-4">
        <div className="border-8 border-black rounded-3xl bg-white shadow-[-3px_3px_0_0_#1f2024] p-10 text-left">
          <h1 className="text-center mb-6">
            Create VTuber Character on Stacks
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Design your VTuber's appearance and personality for engaging with your community on Stacks
          </p>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div>
                <h3>Choose VTuber Appearance</h3>
                <p>Select your VTuber's visual style and characteristics.</p>

                <div className="flex gap-5 mb-8 mt-4">
                  <div
                    onClick={() => setCharacterType("vtuber")}
                    className={`flex-1 p-5 border-4 rounded-xl text-center cursor-pointer transition-all duration-300 ${
                      characterType === "vtuber"
                        ? "border-primary shadow-md transform -translate-y-1 bg-primary/5"
                        : "border-gray-200 hover:border-primary/40"
                    }`}
                  >
                    <img
                      src={char1}
                      alt="VTuber Template"
                      className="w-24 h-24 mb-2 mx-auto rounded-lg object-cover"
                    />
                    <h4 className="font-bold">Anime Template</h4>
                    <p className="text-sm text-gray-600">
                      Choose from our pre-designed anime characters
                    </p>
                  </div>

                  <div
                    onClick={() => setCharacterType("custom")}
                    className={`flex-1 p-5 border-4 rounded-xl text-center cursor-pointer transition-all duration-300 ${
                      characterType === "custom"
                        ? "border-primary shadow-md transform -translate-y-1 bg-primary/5"
                        : "border-gray-200 hover:border-primary/40"
                    }`}
                  >
                    <img
                      src="/images/single-bot@2x.png"
                      alt="Custom Image"
                      className="w-24 h-24 mb-2 mx-auto"
                    />
                    <h4 className="font-bold">Custom Meme Image</h4>
                    <p className="text-sm text-gray-600">
                      Upload your own meme image to be animated
                    </p>
                  </div>
                </div>

                {characterType === "vtuber" && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Select Anime Template</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          className={`border-4 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ${
                            selectedTemplate === template.id
                              ? "border-primary shadow-md transform -translate-y-1 bg-primary/5"
                              : "border-gray-200 hover:border-primary/40"
                          }`}
                        >
                          <div className="aspect-square overflow-hidden rounded-lg mb-3">
                            <img
                              src={template.image}
                              alt={template.name}
                              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <p className="font-bold text-lg m-0">{template.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {characterType === "custom" && (
                  <div>
                    <h3>Upload Your Meme Image</h3>
                    <p>
                      For best results, use a clear image with a single
                      character and minimal background.
                    </p>

                    <div className="border-4 border-dashed border-gray-200 rounded-xl p-6 text-center mb-5 hover:border-primary/40 transition-colors">
                      {customImagePreview ? (
                        <div>
                          <img
                            src={customImagePreview}
                            alt="Preview"
                            className="max-w-[200px] max-h-[200px] mb-2 mx-auto rounded-lg border-2 border-gray-100"
                          />
                          <p className="text-gray-700">{customImage?.name}</p>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomImage(null);
                              setCustomImagePreview(null);
                            }}
                            className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-gray-300 mx-auto mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-gray-500 mb-4">
                            Drag & drop your image here, or click to browse
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="image-upload"
                          />
                          <label htmlFor="image-upload">
                            <button
                              type="button"
                              onClick={() =>
                                document.getElementById("image-upload")?.click()
                              }
                              className="bg-primary text-white px-5 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                            >
                              Upload Image
                            </button>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="primary-button"
                    disabled={
                      characterType === "vtuber"
                        ? !selectedTemplate
                        : !customImage
                    }
                  >
                    Next: Personality
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h3>VTuber Personality</h3>
                <p>
                  Define your VTuber's voice, personality traits, and content style for Stacks community engagement.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-bold text-blue-700">
                        Character Name: {characterName || tokenData.name}
                      </p>
                      <p className="text-sm text-blue-600">
                        Your character's name will be automatically derived from
                        your token name.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-bold">Voice Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {(
                      [
                        "male",
                        "female",
                        "robot",
                        "child",
                        "custom",
                      ] as VoiceType[]
                    ).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setVoiceType(type)}
                        className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                          voiceType === type
                            ? "bg-primary text-white border-primary shadow-md transform -translate-y-1"
                            : "bg-white text-gray-700 border-gray-200 hover:border-primary/40"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-bold">
                    Personality Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(
                      [
                        "friendly",
                        "sarcastic",
                        "energetic",
                        "calm",
                        "informative",
                        "custom",
                      ] as PersonalityType[]
                    ).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPersonalityType(type)}
                        className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                          personalityType === type
                            ? "bg-primary text-white border-primary shadow-md transform -translate-y-1"
                            : "bg-white text-gray-700 border-gray-200 hover:border-primary/40"
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {personalityType === "custom" && (
                  <div className="mb-6">
                    <label
                      htmlFor="customPersonality"
                      className="block mb-2 font-bold"
                    >
                      Custom Personality Description
                    </label>
                    <textarea
                      id="customPersonality"
                      value={customPersonality}
                      onChange={(e) => setCustomPersonality(e.target.value)}
                      required
                      className="w-full p-4 rounded-xl border-2 border-gray-200 text-base min-h-[120px] resize-y focus:border-primary focus:ring focus:ring-primary/20"
                      placeholder="Describe your character's personality traits, interests, and speaking style..."
                    />
                  </div>
                )}

                <div className="flex flex-col gap-6 lg:flex-row md:flex-row justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold border-2 border-gray-300 hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="primary-button"
                    disabled={personalityType === "custom" && !customPersonality}
                  >
                    Next: Stream Setup
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Final Step</h3>
                <p className="mb-4">Review your VTuber configuration before completion.</p>

                {/* YouTube Stream Key Input */}
                <div className="mb-6">
                  <label htmlFor="youtubeStreamKey" className="block text-sm font-medium mb-2">
                    YouTube Stream Key
                  </label>
                  <input
                    type="password"
                    id="youtubeStreamKey"
                    value={youtubeStreamKey}
                    onChange={(e) => setYoutubeStreamKey(e.target.value)}
                    className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:border-primary focus:ring focus:ring-primary/20"
                    placeholder="Enter your YouTube stream key"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="youtubeUrl" className="block text-sm font-medium mb-2">
                    YouTube Stream URL
                  </label>
                  <input
                    type="url"
                    id="youtubeUrl"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:border-primary focus:ring focus:ring-primary/20"
                    placeholder="https://youtube.com/your-stream-url"
                  />
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="secondary-button"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="primary-button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? "Creating Character..." : "Complete Setup"}
                  </button>
                </div>

                {isSubmitting && (
                  <div className="text-center mt-4">
                    <p className="text-primary font-bold">
                      Creating your character...
                    </p>
                    <p className="text-gray-600">
                      Redirecting to dashboard in {redirectCountdown} seconds
                    </p>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CharacterCreationPage;
