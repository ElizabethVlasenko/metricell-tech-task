import Container from "./Container";
import Logo from "./Logo";

export default function Footer() {
  return (
    <Container className="bg-gray-100">
      <div className="flex justify-between py-3 text-gray-600">
        <Logo size="small" />
        <p className="text-sm font-semibold">2025</p>
      </div>
    </Container>
  );
}
