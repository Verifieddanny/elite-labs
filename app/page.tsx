"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { Github, Link2, Mail } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
}


export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalStyle, setModalStyle] = useState({});
  const letterRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const motoRef = useRef<HTMLImageElement>(null);
  const labsRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const projectSectionRef = useRef<HTMLDivElement>(null);
  

  const setLetterRef = (index: number) => (el: HTMLParagraphElement | null) => {
    letterRefs.current[index] = el;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const letters = letterRefs.current.filter(Boolean);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 2,
  
      }
    });

    letters.forEach((letter) => {
      const randomX = (Math.random() - 0.5) * 1000;
      const randomY = (Math.random() - 0.5) * 1000;

      tl.to(letter, {
        x: randomX,
        y: randomY,
        opacity: 0,
        scale: 0,
        rotate: Math.random() * 360,
      }, "<");
    });
   



    tl.to(labsRef.current, {
      scale: 50,
      x: -2200,
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power1.inOut",
    })
      .to(labsRef.current, {
        scale: 150,
        x: -2000,
        y: 0,
        opacity: 0,
        duration: 1,
        ease: "power1.in",
      });

      tl.to(motoRef.current, {
        opacity: 0,
        duration: 1,
        scale: 20,
        ease: "power1.inOut",
      },
      "+=1");
 

    tl.fromTo(projectSectionRef.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "+=0.5"
    );

    tl.to(footerRef.current, {
      opacity: 1
    }, "+=0.5")

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "3Lite Messenger",
      description: "3Lite Messenger is a decentralised messenger  built on the solana blockchain.",
      image: "/3lite.png",
      liveUrl: "https://3litemessenger.netlify.app/",
      githubUrl: "https://github.com/team3lite/3lite-landing-page/"
    },
    {
      title: "Suift Messenger",
      description: "Suift Messenger is a decentralised messenger  built on the solana blockchain.",
      image: "/swift.png",
      liveUrl: "https://suift-landing-page.vercel.app/",
      githubUrl: "https://github.com/Suielite/suift-landing-page"
    },

  ];

  const handleProjectClick = (project: Project, event: React.MouseEvent) => {


    const rect = event.currentTarget.getBoundingClientRect();
  
    setModalStyle({
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
  
    setSelectedProject(project);
  };
  
  return (
    <main className="overflow-hidden relative">
      <div className="md:w-[24rem] md:h-[24rem] w-[12rem] h-[12rem] bg-[#3208ee7a] rounded-full blur-md absolute -left-[5rem] -top-[5rem]"></div>
      <div className="md:w-[24rem] md:h-[24rem] w-[12rem] h-[12rem] bg-[#0059ff7a] rounded-tl-full blur-md absolute right-0 responsiveDiv"></div>

    
      <Image 
        src="/logo.png" 
        alt="nigeria" 
        width={400} 
        height={300} 
        quality={80}
        className="w-[8rem] h-[7rem] blur-sm absolute md:right-[40rem] md:top-[50rem]  right-7 top-[80dvh]" 
      />

      <Image 
        src="/logo.png" 
        alt="nigeria" 
        width={400} 
        height={300} 
        quality={80}
        className="w-[8rem] h-[7rem] blur-sm absolute md:left-[40rem] md:top-[50rem]  left-7 top-[80dvh]" 
      />

      <Image 
        src="/logo.png" 
        alt="nigeria" 
        width={400} 
        height={300} 
        quality={80}
        className="w-[8rem] h-[7rem] blur-sm absolute left-[55rem] top-[35rem] md:block hidden" 
      />

      <div ref={containerRef} className="min-h-screen md:pt-[5rem] text-[#010101] pt-[20rem] relative">
        <div className="w-full flex items-center justify-center gap-x-1 md:text-[8rem] text-[2rem] font-bold ">
          {"ELITE".split('').map((letter, index) => (
            <p
              key={index}
              ref={setLetterRef(index)}
            >
              {letter}
            </p>
          ))}
          
        </div>
        <p 
          ref={labsRef}
          className="md:text-[8rem] text-[2rem] font-bold  text-center transform-gpu"
          style={{ transformOrigin: 'center center' }}
        >
          LABS
        </p>

        <p ref={motoRef} className="text-center">Building next generation technology...</p>

     
        {/* Project showcase section */}
    <div 
      ref={projectSectionRef}
      className="min-h-screen md:pb-0 pb-6 w-full pt-[6rem] bg-gray-100 absolute top-0 left-0 noise"
    >
      <div className="h-full w-full bg-gray-100 noise flex flex-col items-center justify-center relative space-y-8 px-4">

  <h2 className="text-black text-[3rem] font-bold">Project Showcase</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {projects.map((project, index) => (
      <div 
        key={index} 
        className="flex flex-col items-center space-y-4 cursor-pointer"
        onClick={(e) => handleProjectClick(project, e)}
      >
        <Image 
          src={project.image} 
          alt={project.title} 
          width={800} 
          height={700}
          quality={80} 
          className="rounded-lg shadow-md"
        />
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="text-center">{project.description}</p>
        <div className="flex space-x-4">
          <Link href={project.githubUrl} className="flex flex-col items-center">
            <Github /> <span>Github</span>
          </Link>

          <Link href={project.liveUrl} className="flex flex-col items-center">
            <Link2 /> <span>Live Url</span>
          </Link>

        
        
        </div>
      </div>
    ))}
  </div>
{/* Modal for displaying project details */}
{selectedProject && (
  <div
    className=" hidden fixed z-50 bg-black bg-opacity-50 inset-0 md:flex items-center justify-center"
    onClick={() => setSelectedProject(null)}
  >
    <div
      className="bg-white rounded-lg  w-[17rem] h-[10rem]  mx-4 flex flex-row relative overflow-hidden"
      style={{
        position: "absolute",
        ...modalStyle,
        animation: "modalGrow 0.5s ease forwards",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => setSelectedProject(null)}
      >
        &times;
      </button>
      <Image
        src={selectedProject.image}
        alt={selectedProject.title}
        width={1300} 
          height={1200}
          quality={80} 
        className="shadow-md h-full w-[70%]"
      />
      <div className=" w-[30%] flex flex-col relative justify-center overflow-hidden">

    
      <Image 
        src="/logo.png" 
        alt="nigeria" 
        width={400} 
        height={300} 
        quality={80}
        className="w-[13rem] h-[12rem] blur-sm absolute -top-10  -left-10" 
      />

<Image 
        src="/logo.png" 
        alt="nigeria" 
        width={400} 
        height={300} 
        quality={80}
        className="w-[13rem] h-[12rem] blur-sm absolute -bottom-10  -right-10" 
      />
      <h3 className="text-2xl text-center font-semibold mb-2">{selectedProject.title}</h3>
      <p className="text-gray-700 text-center">{selectedProject.description}</p>
      <div className="flex space-x-4 mt-4 px-10 absolute bottom-[3rem] left-0">
      <Link href={selectedProject.githubUrl}>
            <Github /> <span>Github</span>
          </Link>

          <Link href={selectedProject.liveUrl}>
            <Link2 /> <span>Live Url</span>
          </Link>

      </div>
      </div>
    </div>
    </div>
)}


      <style jsx>{`
        @keyframes modalGrow {
          to {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            height: auto;
            }
            }
            
            
            `}</style>
            </div>
</div>


<footer ref={footerRef} className="h-full text-black p-6 w-full mt-[8rem]">
  <h3 className="text-center text-[3rem] font-bold">Reach us on</h3>

<div className="w-full flex justify-center gap-8 items-center">

      <Link href="https://x.com/teamsuielite">
          <svg role="img" className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
          </Link>

          <Link href="mailto:team.suielite@gmail.com">
            <Mail className="w-8 h-8" />
          </Link>
</div>
      </footer>

      </div>



    </main>
  );
}
