import Wrapper from '@/main/common/Wrapper';
import Button from '@/main/common/Button';
import Typography from '@/main/common/Typography';
import styles from './SelectedPhotoList.module.scss';

type Props = {
    selectedPhotos: number[];
    onBackClick: () => void;
};

export default function SelectedPhotoList({ selectedPhotos, onBackClick }: Props) {
    return (
        <Wrapper direction="col" gap="2rem">
            <Typography content="写真" color="primary" size="normal" />
            <Wrapper gap="1.5rem" className={styles.container}>
                <Wrapper padding="1rem 2rem 1rem 0" className={styles.photo_container_wrapper}>
                    <Wrapper direction="row" gap="2rem" padding="0 12.9rem 0 1rem" className={styles.photo_container}>
                        {selectedPhotos.map((_, index) => (
                            <Wrapper key={index} direction="col" align="align-center" className={styles.photo_item}>
                            </Wrapper>
                        ))}
                    </Wrapper>
                </Wrapper>
                <Button bgColor="primary" padding="0.7rem" className={styles.back_button} onClick={onBackClick}>
                    <Typography content="編集" color="primary" size="normal" />
                </Button>
            </Wrapper>
        </Wrapper>
    );
}
