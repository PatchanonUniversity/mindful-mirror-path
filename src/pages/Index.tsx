import GameContainer from "@/components/game/GameContainer";

interface Props {
  playMusic: (src: string) => void;
}

const Index = ({ playMusic }: Props) => {
  return <GameContainer playMusic={playMusic} />;
};

export default Index;
