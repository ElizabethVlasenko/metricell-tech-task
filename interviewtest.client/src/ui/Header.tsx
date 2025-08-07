import Container from "./Container";
import Logo from "./Logo";

export default function Header() {
  return (
    <Container className="bg-gray-100">
      <div className="flex justify-between py-3">
        <Logo />
      </div>
    </Container>
  );
}
