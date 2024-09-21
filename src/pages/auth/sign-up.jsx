import {
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import useAxiosPublic from "../../hooks/axiosPublic";
import { imageUpload } from './../../hooks/useImageApi';
import toast from "react-hot-toast";

export function SignUp() {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  
  // Function to generate a random 8-digit alphanumeric referral code
  const generateReferCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referCode = '';
    for (let i = 0; i < 8; i++) {
      referCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return referCode;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const number = form.number.value;
    const email = form.email.value;
    const password = form.password.value;
    const student_refer_code = form.student_refer_code.value || "";
    const image = form.image.files[0];
    const refer_code = form.refer_code?.value || generateReferCode();

    if (!image) {
      toast.error('Please upload an image.')
      return;
    }

    setLoading(true);
    try {
      const result = await createUser(email, password);
      const imageData = await imageUpload(image);
      const currentDate = new Date();
      const localTime = currentDate.toLocaleString();

      const userInfo = {
        name,
        email,
        password,
        number,
        refer_code,
        student_refer_code,
        image: imageData?.data?.display_url,
        role: "Student", 
        status: "in active",
        createdAt: localTime,
        smsDone: "undone"
      };

      await axiosPublic.post("/createUsers", userInfo).then((res) => {
        if (res.data.insertedId) {
          toast('Registration successfull')
          navigate("/auth/sign-in");
        }
      });
    } catch (error) {
      toast.error('Registration unsuccessfull')
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-4">
            <Typography variant="small" color="blue-gray" className=" font-medium">
              Your name
            </Typography>
            <Input size="lg" type="text" placeholder="Your name" name="name" required />
          </div>
          <div className="mb-4">
            <Typography variant="small" color="blue-gray" className=" font-medium">
              Your number
            </Typography>
            <Input size="lg" type="text" placeholder="Your number" name="number" required />
          </div>
          <div className="mb-4">
            <Typography variant="small" color="blue-gray" className=" font-medium">
              Your email
            </Typography>
            <Input size="lg" type="email" placeholder="name@mail.com" name="email" required />
          </div>
          <div className="mb-4">
            <Typography variant="small" color="blue-gray" className=" font-medium">
              Your password
            </Typography>
            <Input size="lg" type="password" placeholder="Password" name="password" required />
          </div>
          <div className="mb-4">
            <Typography variant="small" color="blue-gray" className=" font-medium">
              Your reference code
            </Typography>
            <Input size="lg" type="text" placeholder="Code" name="student_refer_code" />
          </div>
          <div className="mb-4">
            <Typography variant="small" color="blue-gray" className=" font-medium">
              Your image
            </Typography>
            <Input size="lg" type="file" placeholder="Image" name="image" accept="image/*" required />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree to the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            required
          />
          <Button type="submit" className="mt-6 bg-blue-600 flex justify-center items-center gap-6" fullWidth>
            Register Now {loading && <Spinner className="h-4 w-4" />}
          </Button>

          <div className="space-y-4 mt-8">
            <Button onClick={handleGoogleSignIn} size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <FcGoogle className="text-xl" />
              <span>Sign in With Google</span>
            </Button>
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
