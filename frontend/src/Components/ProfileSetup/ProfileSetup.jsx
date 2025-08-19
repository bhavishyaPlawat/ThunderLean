// frontend/src/Components/ProfileSetup/ProfileSetup.jsx
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SetupStep1 from "./SetupStep1";
import SetupStep2 from "./SetupStep2";
import SetupStep3 from "./SetupStep3";
import SetupStep4 from "./SetupStep4";
import SetupStep5 from "./SetupStep5";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    avatar_url: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    goal: {},
  });
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateForm = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const submitProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update(formData)
        .eq("id", user.id);
      if (error) {
        console.error("Error updating profile:", error);
      } else {
        navigate("/home");
      }
    }
  };

  const steps = [
    <SetupStep1 nextStep={nextStep} updateForm={updateForm} />,
    <SetupStep2
      nextStep={nextStep}
      prevStep={prevStep}
      updateForm={updateForm}
    />,
    <SetupStep3
      nextStep={nextStep}
      prevStep={prevStep}
      updateForm={updateForm}
    />,
    <SetupStep4
      nextStep={nextStep}
      prevStep={prevStep}
      updateForm={updateForm}
    />,
    <SetupStep5
      submitProfile={submitProfile}
      prevStep={prevStep}
      updateForm={updateForm}
    />,
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-1/5 h-2 rounded-full ${
                  step > i ? "bg-purple-600" : "bg-gray-700"
                }`}
              ></div>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">{steps[step - 1]}</AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileSetup;
