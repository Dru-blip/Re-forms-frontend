import OTPForm from "@/components/auth/otp-form";

export default function OTPVerificationPage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen">
            <OTPForm id={params.id} />
        </div>
    );
}
