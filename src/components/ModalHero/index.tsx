import { IHeroProps } from '@/interface/IHeroProps';
import { Box, Button, Text } from '@chakra-ui/react';
import Image from 'next/image';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHero: IHeroProps[];
}

const HeroModal = ({ isOpen, onClose, selectedHero }: IModalProps) => {
  const findWinner = () => {
    if (selectedHero.length === 0) return null;

    let winner = selectedHero[0];
    let maxPower = calculatePowerstats(selectedHero[0]);

    for (const hero of selectedHero) {
      const heroPower = calculatePowerstats(hero);
      if (heroPower > maxPower) {
        winner = hero;
        maxPower = heroPower;
      }
    }

    return winner;
  };

  const calculatePowerstats = (hero: IHeroProps) => {
    const { combat, durability, intelligence, power, speed, strength } =
      hero.powerstats;
    return combat + durability + intelligence + power + speed + strength;
  };

  const winner = findWinner();

  return (
    <>
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="999"
          backgroundColor="rgba(0, 0, 0, 0.5)"
        >
          <Box
            bg="white"
            p="4"
            borderRadius="lg"
            textAlign="center"
            boxShadow="lg"
          >
            <Text>
              <span className="text-green-500 font-semibold">Winner</span>{' '}
              {winner?.name}
            </Text>
            <Box display="flex" justifyContent="space-between" mt="4">
              {selectedHero.map(hero => (
                <Box
                  key={hero.id}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  margin="0 10px"
                >
                  <Box>
                    <Image
                      src={hero.images.lg}
                      alt="imagem do herói"
                      width={200}
                      height={150}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Text color={'#000'} fontWeight={'bold'}>
                      {hero.name}
                    </Text>
                  </Box>
                  <Box textAlign="center">
                    <Box>Intelligence: {hero.powerstats.intelligence}</Box>
                    <Box>Strength: {hero.powerstats.strength}</Box>
                    <Box>Speed: {hero.powerstats.speed}</Box>
                    <Box>Durability: {hero.powerstats.durability}</Box>
                    <Box>Power: {hero.powerstats.power}</Box>
                    <Box>Combat: {hero.powerstats.combat}</Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Button onClick={onClose}>Fechar</Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default HeroModal;
