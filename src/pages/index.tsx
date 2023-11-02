import HeroModal from '@/components/ModalHero';
import { IHeroProps } from '@/interface/IHeroProps';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiZeusSword } from 'react-icons/gi';
import Apihero from '../services/api';

const inter = Inter({ subsets: ['latin'] });

interface ISSRProps {
	data: IHeroProps[];
}

export default function Home({ data }: ISSRProps) {
	const [selectedHero, setSelectedHero] = useState<IHeroProps[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');

	// Filtra heróis com base na pesquisa
	const filteredHero = data.filter((hero) => {
		const heroName = hero.name.toLowerCase();
		return heroName.includes(search.toLowerCase());
	})

	// Calcula o poder do herói
	const calculatePowerstats = (hero: IHeroProps) => {
		const {combat, durability, intelligence, power, speed, strength} = hero.powerstats;
		return combat + durability + intelligence + power + speed + strength;
	};

	// Lida com a seleção do herói
	const toggleSelectedHero = (hero: IHeroProps) => {
		if (selectedHero.includes(hero)) {
			// remove
			setSelectedHero(selectedHero.filter((item) => item.id !== hero.id));
		} else {
			// adiciona
			setSelectedHero([...selectedHero, hero]);
		}

		if (selectedHero.length === 1) {
			setIsModalOpen(true);
		}
	};

	// Lida com o fechamento do modal
	const handleClosedModal = () => {
		setIsModalOpen(false);
		setSelectedHero([]);
	};

	return (
		<main className={`${inter.className}`}>
			<Flex justify="space-between" alignItems="center" p="10px"  justifyContent='flex-end' mr={'5'}>
        <Flex alignItems="center">
          <input
            type="text"
            placeholder="Pesquisar herói"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #000',
              borderRadius: '4px',
            }}
          />
          <AiOutlineSearch
            size={20}
            color="#000"
            style={{ cursor: 'pointer', marginLeft: '-30px' }}
          />
        </Flex>
			</Flex>
			<Flex 
				display='flex'
				flexWrap='wrap'
				justify='center'
				px='4'
			>
				{filteredHero.map((hero) => (
					<Box 
						key={hero.id} 
						backgroundColor={selectedHero.includes(hero) ? "#FFD700" : "#006400"}
						p='4'
						border='2px solid #000'
						borderRadius='lg'
						m='4'
						onClick={() => toggleSelectedHero(hero)}
					>
						<Image src={hero.images.lg} alt="imagem do hero" width={150} height={100}/>
						<Text
							textAlign='center'
							mt='2'
							color={"#fff"}
						>
							{hero.name}
						</Text>
						<Text
							display="flex"
							color={"#fff"}
							justifyContent="center"
							mt='2'
						>
							<GiZeusSword size={20} color={"#fff"} />
							{calculatePowerstats(hero)}
						</Text>
					</Box>
				))}
			</Flex>
			<HeroModal isOpen={isModalOpen} selectedHero={selectedHero} onClose={handleClosedModal}/>
		</main>
	);
}

export async function getServerSideProps() {
	try {
		const { data } = await Apihero.get('api/ps/metahumans');
		return {
			props: {
				data
			}
		}
	} catch (error) {
		console.log(error);
		return {
			props: {
				data: []
			}
		}
	}
}