import styles from "@/main/components/stores/BulkPhoto/SelectPhoto.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import SearchBox from "@/main/common/SearchBox";
import FileIcon from "@/main/assets/FileIcon.svg";
import PhotoIcon from "@/main/assets/PhotoIcon.svg";
import Separator from "@/main/common/Separator";
import { useState } from "react";
import React from "react";
import Ellipsis from "@/main/assets/Ellipsis.svg";
import FolderIcon from "@/main/assets/FolderIcon.svg";
import classNames from "classnames";
import useFileUploadModal from "@/main/common/FileUploadModal/useFileUploadModal";

type Props = {
  onNextClick: () => void
  onBackClick: () => void
}

type Photo = {
    name: string;
    sourceUrl: string;
  };

  const samplePhotos: Photo[] = [
    { name: "photo1.jpg", sourceUrl: "https://example.com/photo1.jpg" },
    { name: "photo2.jpg", sourceUrl: "https://example.com/photo2.jpg" },
    { name: "photo3.jpg", sourceUrl: "https://example.com/photo3.jpg" },
    { name: "photo4.jpg", sourceUrl: "https://example.com/photo4.jpg" },
    { name: "photo5.jpg", sourceUrl: "https://example.com/photo5.jpg" },
    { name: "photo6.jpg", sourceUrl: "https://example.com/photo6.jpg" },
    { name: "photo7.jpg", sourceUrl: "https://example.com/photo7.jpg" },
    { name: "photo8.jpg", sourceUrl: "https://example.com/photo8.jpg" },
    { name: "photo9.jpg", sourceUrl: "https://example.com/photo9.jpg" },
    { name: "photo10.jpg", sourceUrl: "https://example.com/photo10.jpg" },
    { name: "photo11.jpg", sourceUrl: "https://example.com/photo11.jpg" },
    { name: "photo12.jpg", sourceUrl: "https://example.com/photo12.jpg" },
    { name: "photo13.jpg", sourceUrl: "https://example.com/photo13.jpg" },
    { name: "photo14.jpg", sourceUrl: "https://example.com/photo14.jpg" },
    { name: "photo15.jpg", sourceUrl: "https://example.com/photo15.jpg" },
    { name: "photo16.jpg", sourceUrl: "https://example.com/photo16.jpg" },
    { name: "photo17.jpg", sourceUrl: "https://example.com/photo17.jpg" },
    { name: "photo18.jpg", sourceUrl: "https://example.com/photo18.jpg" },
    { name: "photo19.jpg", sourceUrl: "https://example.com/photo19.jpg" },
    { name: "photo20.jpg", sourceUrl: "https://example.com/photo20.jpg" },
]

const folders = ['2021年', '2020年']

export default function SelectPhoto({onNextClick, onBackClick}: Props) {
    const [folderHierarchy, setFolderHierarchy] = useState<string[]>(['南青山店', '外観写真'])
    const [selectedPhotoIndices, setSelectedPhotoIndices] = useState<number[]>([]);

    const handlePhotoClick = (index: number) => {
        setSelectedPhotoIndices(prevSelected =>
            prevSelected.includes(index)
                ? prevSelected.filter(i => i !== index)
                : [...prevSelected, index]
        );
    };

    const { openModal, render } = useFileUploadModal({})

    return (
    <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
        <Wrapper direction="col" gap="2rem">
            <Typography content="写真一覧" color="primary" size="medium" />
            <Wrapper justify="justify-between" align="align-center">
                <Wrapper gap="4rem" align="align-center">
                    <SearchBox placeholder="ファイル名で検索" width="42.7rem" onChange={() => {}} />
                    <Wrapper gap="2rem">
                        <Button bgColor="primary" padding="0.7rem 1.8rem" className={styles.button} onClick={openModal}>
                            <img src={FileIcon} alt="ファイル" />
                            <Typography content="写真をアップロード" color="primary" size="normal" weight="normal" />
                        </Button>
                        <Button bgColor="primary" padding="0.7rem 1.8rem" className={styles.button}>
                            <img src={PhotoIcon} alt="フォルダ" />
                            <Typography content="共通フォルダに移動" color="primary" size="normal" weight="normal" />
                        </Button>
                    </Wrapper>
                </Wrapper>
                <Button bgColor="black" className={styles.delete_button}>
                    <Typography content="写真を削除" color="white" size="normal" weight="normal" />
                </Button>
            </Wrapper>
            <Separator width="100%" />
        </Wrapper>
        <Wrapper direction="col" gap="4rem" padding="2rem 0 0">
            <Wrapper gap="2rem">
                {folderHierarchy.map((folder, i) => (
                    <React.Fragment key={i}>
                        <Typography
                            content={folder}
                            color="primary"
                            size="normal"
                            weight={i === folderHierarchy.length - 1 ? undefined : 'normal'}
                        />
                        {i !== folderHierarchy.length - 1 && <Typography content=">" color="primary" size="normal" weight={i === folderHierarchy.length - 2 ? undefined : 'normal'} />}
                    </React.Fragment>
                ))}
            </Wrapper>
            <Wrapper direction="row" gap="3rem" className={styles.photo_container}>
            {samplePhotos.map((photo, index) => (
                <div
                    key={index}
                    className={classNames(styles.photo_button, selectedPhotoIndices.includes(index) ? styles.selected : '')}
                    onClick={() => handlePhotoClick(index)}
                >
                    <Wrapper align="align-center" justify="justify-between">
                        <Typography content={photo.name} color="primary" size="xsmall" weight="normal" />
                        <img src={Ellipsis} alt="..." width="16px" height="16px" />
                    </Wrapper>
                    <div className={styles.photo_button_img} />
                </div>
            ))}
            </Wrapper>
            <Wrapper gap="3rem">
                {folders.map((folder, i) => (
                    <div className={styles.photo_folder} key={i}>
                        <Wrapper gap="1rem">
                            <img src={FolderIcon} alt="フォルダ" width="32px" height="27px" />
                            <Typography content={folder} color="primary" size="xsmall" />
                        </Wrapper>
                        <img src={Ellipsis} alt="..." width="16px" height="16px" />
                    </div>
                ))}
            </Wrapper>
        </Wrapper>
        <Wrapper direction="col" padding="5rem 0 0" gap="8.1rem">
            <Wrapper>
            <Button bgColor="primary" padding="0.7rem 3.5rem" className={styles.button} onClick={onNextClick}>
                <Typography content="次に進む" color="primary" size="normal" />
            </Button>
            </Wrapper>
            <Wrapper>
            <Button bgColor="secondary" padding="0.7rem 3.5rem" className={styles.button} onClick={onBackClick}>
                <Typography content="戻る" color="primary" size="normal" />
            </Button>
            </Wrapper>
        </Wrapper>
        {render()}
    </Wrapper>
)}
