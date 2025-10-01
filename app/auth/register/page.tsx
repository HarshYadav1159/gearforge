'use client'
import { login, register, RegistrationData } from "@/app/api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { v4 as uuidv4 } from "uuid"

function Register() {

    const router = useRouter()
    const [name, setName] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [isSamePassword, setSamePassword] = useState<boolean>(true)
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)
    const [isConfirmPasswordVisible, setConfirmPasswordVisibile] = useState<boolean>(false)
    const [isValidPasswordLength, setValidPasswordLength] = useState<boolean>(true)
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [isUserExist, setUserExists] = useState<boolean>(false)
    const [isEmailExist, setEmailExist] = useState<boolean>(false)

    const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }
    const handleUserNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
        setUserExists(false)
    }

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)
    const showError = (msg: string) => {
        setModalMsg(msg);
        setModalOpen(true);
    };

    useEffect(() => {

        if (password.length >= 8)
            setValidPasswordLength(true)
        else if (password.length !== 0)
            setValidPasswordLength(false)

        if (password === confirmPassword) {
            setSamePassword(true)
        } else if (confirmPassword !== "") {
            setSamePassword(false)
        }

    }, [confirmPassword, password, setConfirmPassword, setPassword])

    const newUserData: RegistrationData = { user_id: uuidv4(), name: name, email: email, user_name: userName, password: password }

     const loginUser = useMutation({
        mutationKey:['login_user'],
        mutationFn:async()=> login({email:email, password:password}),
        onSuccess:()=>{
            router.push("/")
        }
    })
    
    const registerUser = useMutation({
        mutationKey: ['register_user'],
        mutationFn: async () => register(newUserData),
        onError: (error: AxiosError) => {
            if (error.response?.status === 403) {
                setUserExists(true)
            }

            if(error.response?.status==409){
                console.log(error.code)
                setEmailExist(true)
            }
        },
        onSuccess: () => {
            loginUser.mutate()
            console.log("user logged in successfully")
        }
    })

    const handleOnRegisterClick = (e: React.FormEvent) => {

        e.preventDefault()

        if (password.length === 0) {
            showError("Password cannot be empty")
            return
        }

        if (password.length < 8) {
            showError("Password must be at least 8 characters long")
            return
        }

        registerUser.mutate()
    }

    return (<><div className="min-h-screen flex justify-center items-center px-4">

        <form className="bg-[#242528] flex flex-col gap-3 p-4 w-full max-w-sm h-fit rounded-xl">
            <div className="flex justify-center"><p className="text-2xl text-white">Register</p></div>

            <div className="w-full">
                <input onChange={handleNameInput} className="p-2 bg-[#161719] rounded w-full" placeholder="Name"></input>
            </div>
            <div className="w-full">
                <input onChange={handleUserNameInput} className="p-2 bg-[#161719] rounded w-full" placeholder="Username"></input>
            </div>
            <span className={!isUserExist ? "hidden" : ""}><p className="text-red-600" >User Already Exists! Try a different username</p></span>
            <div className="w-full">
                <input onChange={handleEmailInput} className="p-2 bg-[#161719] rounded w-full" placeholder="Email"></input>
            </div>
              <span className={!isEmailExist ? "hidden" : ""}><p className="text-red-600" >Email Already Exists! Try Signing In</p></span>
            <div className="relative w-full ">
                <input onChange={handlePasswordInput} className="p-2 bg-[#161719] rounded w-full" type={isPasswordVisible ? "text" : "password"} placeholder="Password"></input>
                <div onClick={() => setPasswordVisible(prevState => !prevState)} className="absolute right-3 p-1 top-1/2 -translate-y-1/2 hover:bg-neutral-700 hover:rounded-2xl cursor-pointer text-white select-none text-xl">{isPasswordVisible ? <MdVisibility /> : <MdVisibilityOff />}</div>
            </div>
            <span className={isValidPasswordLength ? "hidden" : ""}>{!isValidPasswordLength ? <p className="text-red-600" >Password must be at least 8 characters</p> : <p></p>}</span>
            <div className="w-full relative">
                <input onChange={handleConfirmPassword} className="p-2 bg-[#161719] rounded w-full" type={isConfirmPasswordVisible ? "text" : "password"} placeholder="Confirm Password"></input>
                <div onClick={() => setConfirmPasswordVisibile(prevState => !prevState)} className="absolute right-3 p-1 top-1/2 -translate-y-1/2 hover:bg-neutral-700 hover:rounded-2xl  cursor-pointer text-white select-none text-xl">{isConfirmPasswordVisible ? <MdVisibility /> : <MdVisibilityOff />}</div>
            </div>
            <span>{!isSamePassword ? <p className="text-red-600" >Passwords do not match</p> : ""}</span>
            <button onClick={handleOnRegisterClick} className="border rounded-2xl p-2 transition-all duration-200 ease-in-out hover:bg-blue-500 hover:text-white cursor-pointer">Register</button>
            <p className="self-center">or You can sign in with</p>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="w-full border rounded flex justify-center items-center p-2 cursor-pointer"><Image src={"/google-symbol.png"} height={30} width={30} alt="Google Logo" /><p>Google</p></div>
            </div>
        </form>
    </div>
        <Modal
            open={modalOpen}
            title="Notice"
            message={modalMsg}
            onClose={() => setModalOpen(false)}
        />
    </>
    )
}

function Modal({
    open,
    title,
    message,
    onClose,
}: {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
}) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
        >
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative w-[90vw] max-w-md rounded-xl bg-[#242528] p-5 shadow-xl ring-1 ring-white/10">
                <h2 id="dialog-title" className="text-lg font-semibold text-white">
                    {title}
                </h2>
                <p className="mt-2 text-sm text-neutral-300">{message}</p>
                <div className="mt-5 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-neutral-600 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-700"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register