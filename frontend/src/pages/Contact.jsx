import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { BiUser, BiEnvelope, BiMessageDetail, BiLoaderAlt, BiCheckCircle } from "react-icons/bi";

const Contact = () => {
  const container = useRef();
  const formRef = useRef();
  const bgTextRef = useRef();
  const [status, setStatus] = useState("idle");

  useGSAP(() => {
    gsap.from(bgTextRef.current, {
      x: "100%",
      opacity: 0,
      duration: 2,
      ease: "power4.out",
      delay: 0.3
    });
  }, { scope: container });

  const handleSimpleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(formRef.current);
    formData.append("access_key", "8bd04afa-e855-432b-9bf4-c001f9936874");
    formData.append("subject", "Instant Portfolio Lead");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("idle");
      }
    } catch (err) {
      setStatus("idle");
    }
  };

  return (
    <section ref={container} className="pb-16 pt-26 relative overflow-hidden ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12  relative z-10">
        <div className='lg:px-8'>
          <div className="bg-[#161616] p-8 md:p-12 rounded-2xl ">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <BiCheckCircle className="text-[#00f2ad] text-7xl mb-4" />
                <p className="text-3xl font-bold text-white mb-2">Sent!</p>
                <p className="text-zinc-500">I'll get back to you shortly.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-[#00f2ad] hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSimpleSubmit} className="space-y-10">
                <p className="text-3xl font-semibold text-white text-center">Send a Message</p>

                <div className="border-b border-zinc-800 pb-2 focus-within:border-[#00f2ad] transition-colors">
                  <label className="text-white text-sm mb-1 font-medium">Full Name</label>
                  <div className="flex items-center justify-between">
                    <input name="name" type="text" placeholder="Your Name" className="bg-transparent border-none  text-white w-full focus:outline-none focus:ring-0 focus:border-none placeholder:text-zinc-600" />
                    <BiUser className="text-[#00f2ad] text-xl" />
                  </div>
                </div>

                <div className="border-b border-zinc-800 pb-2 focus-within:border-[#00f2ad] transition-colors">
                  <label className="text-white text-sm mb-1 font-medium">Email Address</label>
                  <div className="flex items-center justify-between">
                    <input name="email" type="text" placeholder="Your Email" className="bg-transparent border-none text-white w-full focus:outline-none focus:ring-0 focus:border-none placeholder:text-zinc-600" />
                    <BiEnvelope className="text-[#00f2ad] text-xl" />
                  </div>
                </div>

                <div className="border-b border-zinc-800 pb-2 focus-within:border-[#00f2ad] transition-colors">
                  <label className="text-white text-sm mb-1 font-medium">Message</label>
                  <div className="flex items-center justify-between">
                    <textarea name="message" rows="1" placeholder="Type anything..." className="bg-transparent border-none text-white w-full focus:outline-none focus:ring-0 focus:border-none placeholder:text-zinc-600 resize-none" />
                    <BiMessageDetail className="text-[#00f2ad] text-xl" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#00f2ad] hover:bg-emerald-400 disabled:bg-zinc-800 text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                  {status === "loading" ? <BiLoaderAlt className="animate-spin text-2xl" /> : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>


        <div className="space-y-8 px-4 lg:px-2">
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#00f2ad] rounded-full animate-pulse" />
              <p className="text-zinc-500 uppercase tracking-widest text-sm font-bold">Contact Details</p>
            </div>
            <p className="text-6xl font-bold text-white leading-[0.9] mb-0">
              Want to reach  <br />out?
            </p>
            <p className="text-zinc-400 text-xl max-w-xs ms-auto mt-3 md:-mt-6">
              Have an idea or project in mind? Feel free to reach out and share your goals.
            </p>
          </div>
          <div className='flex justify-around gap-5 text-white'>
            <div className='flex items-center gap-2'>
              <a href="https://github.com/anisha-max" target='_blank' className="text-[#00f2ad] hover:text-gray-300 transition-colors text-lg border border-gray-600 rounded-md p-1"><FaGithub /></a> Github
            </div>
            <div className='flex items-center gap-2'>
              <a href="https://www.linkedin.com/in/anisha-parmar-997160309/" target='_blank' className="text-[#00f2ad] hover:text-gray-300 transition-colors text-lg border border-gray-600 rounded-md p-1"><FaLinkedinIn /></a> Linkedin
            </div>
            <div className='flex items-center gap-2'>
              <a href="https://x.com/anisha_par23007" target='_blank' className="text-[#00f2ad] hover:text-gray-300 transition-colors text-lg border border-gray-600 rounded-md p-1"><FaTwitter /></a> Twitter

            </div>
          </div>
        </div>

      </div>
      <div
        ref={bgTextRef}
        className="absolute bottom-10 right-0 text-8xl md:text-[12rem] font-bold text-zinc-400/20 select-none pointer-events-none  whitespace-nowrap"
      >
        Contact
      </div>
    </section>
  );
};

export default Contact;