import styles from "./EditPhotoLayoutV2.module.scss";
import Wrapper from "@/main/common/Wrapper";
import Typography from "@/main/common/Typography";
import Button from "@/main/common/Button";
import SearchBox from "@/main/common/SearchBox";
import FileIcon from "@/main/assets/FileIcon.svg";
import Separator from "@/main/common/Separator";
import { useState, ChangeEvent, useEffect } from "react";
import Ellipsis from "@/main/assets/Ellipsis.svg";
import classNames from "classnames";
import useFileUploadModal from "@/main/common/FileUploadModal/useFileUploadModal";
import { useParams } from "react-router-dom";
import { GoogleService } from "@/main/service/GoogleService";
import { GoogleLocationPhotoModel } from "@/main/model/LocationModel";
import { LocationAssociationName } from "@/main/model/LocationAssociationName";

type Props = {
    googleService: GoogleService;
};

export default function EditPhotoLayoutV2({ googleService }: Props) {
    const { accountId, locationId } = useParams();
    const [selectedPhotoIndices, setSelectedPhotoIndices] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [photoList, setPhotoList] = useState<GoogleLocationPhotoModel[]>([]);

    const fetchPhotos = async () => {
        if (accountId && locationId) {
            try {
                const photos = await googleService.getLocationPhotos(
                    accountId,
                    locationId
                );
                setPhotoList(photos);
            } catch (error) {
                console.error("写真の取得に失敗しました:", error);
            }
        }
    };

    const { openModal, render } = useFileUploadModal({ googleService, accountId, locationId, onUploadSuccess: () => {
        fetchPhotos();
    } });

    useEffect(() => {
        fetchPhotos();
    }, [accountId, locationId, googleService]);

    const handlePhotoClick = (index: number) => {
        if (selectedPhotoIndices.includes(index)) {
            setSelectedPhotoIndices(selectedPhotoIndices.filter(i => i !== index));
        } else {
            setSelectedPhotoIndices([...selectedPhotoIndices, index]);
        }
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredPhotos = photoList.filter(photo =>
        photo.locationAssociation?.category?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false
    );

    return (
        <Wrapper direction="col" padding="5rem 4.3rem 5.9rem 5rem" className={styles.content_container}>
            <Wrapper direction="col" gap="2rem">
                <Typography content="写真一覧" color="primary" size="medium" />
                <Wrapper justify="justify-between" align="align-center">
                    <Wrapper gap="4rem" align="align-center">
                        <SearchBox placeholder="カテゴリで検索" width="42.7rem" onChange={handleSearchChange} />
                        <Wrapper gap="2rem">
                            <Button bgColor="primary" padding="0.7rem 1.8rem" className={styles.button} onClick={openModal}>
                                <img src={FileIcon} alt="ファイル" />
                                <Typography content="写真をアップロード" color="primary" size="normal" weight="normal" />
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
                <Wrapper direction="row" gap="3rem" className={styles.photo_container}>
                    {filteredPhotos.map((photo, index) => (
                        <div
                            key={photo.name ?? index}
                            className={classNames(styles.photo_button, selectedPhotoIndices.includes(index) ? styles.selected : '')}
                            onClick={() => handlePhotoClick(index)}
                        >
                            <Wrapper align="align-center" justify="justify-between">
                                <Typography
                                    content={photo.locationAssociation?.category ?? LocationAssociationName.CATEGORY_UNSPECIFIED}
                                    color="primary"
                                    size="xsmall"
                                    weight="normal"
                                />
                                <img src={Ellipsis} alt="..." width="16px" height="16px" />
                            </Wrapper>
                            <div
                                className={styles.photo_button_img}
                                style={{ backgroundImage: photo.googleUrl ? `url(${photo.googleUrl})` : 'none' }}
                            />
                        </div>
                    ))}
                </Wrapper>
            </Wrapper>
            {render()}
        </Wrapper>
    );
}
