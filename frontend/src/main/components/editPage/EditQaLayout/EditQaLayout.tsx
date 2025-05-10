import styles from '@/main/components/editPage/EditQaLayout/EditQaLayout.module.scss';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import SearchBox from '@/main/common/SearchBox';
import { GoogleService } from '@/main/service/GoogleService';
import { useState } from 'react';
import Separator from '@/main/common/Separator';
import UserIcon from '@/main/assets/UserIcon.svg'
import AddIcon from '@/main/assets/AddIcon.svg'
// ダミーデータ
const dummyQuestions = [
  {
    id: 1,
    question: '営業時間は何時から何時までですか？',
    answered: true,
    answer: '営業時間は10:00〜20:00です。',
    userName: '山田太郎',
  },
  {
    id: 2,
    question: '駐車場はありますか？',
    answered: false,
  },
  {
    id: 3,
    question: 'クレジットカードは使えますか？',
    answered: true,
    answer: 'はい、VISA・MasterCard・JCBがご利用いただけます。',
    userName: '佐藤花子',
  },
  {
    id: 4,
    question: 'ペット同伴は可能ですか？',
    answered: false,
  },
  {
    id: 5,
    question: '定休日はいつですか？',
    answered: true,
    answer: '毎週水曜日が定休日です。',
    userName: '鈴木一郎',
  },
];

type Props = {
  googleService: GoogleService;
};

export default function EditQaLayout({ googleService }: Props) {
  const [search, setSearch] = useState('');

  return (
    <Wrapper direction="col" className={styles.edit_qa_container}>
      {/* ヘッダー */}
      <Wrapper className={styles.header_container} direction="col" gap="24px">
        <Typography content="Q＆A" size="medium" color="primary" />
        <Wrapper direction="row" gap="16px" align="align-center">
          <SearchBox
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="質問を検索"
          />
          <Button bgColor="primary">
            <Wrapper direction="row" gap="8px" align="align-center">
              <img src={AddIcon} alt="追加" />
              <Typography content="よくある質問を作成" size="normal" color="primary" />
            </Wrapper>
          </Button>
        </Wrapper>
      </Wrapper>
      {/* 質問リスト */}
      <Wrapper className={styles.qa_container} direction="col" gap="16px">
        {dummyQuestions.map((q, i) => (
          <>
            <Wrapper key={q.id} className={styles.question_row} direction="row" align="align-end" gap="10px">
              <Wrapper
                direction="row"
                align="align-center"
                className={styles.question_item}
                padding="20px"
              >
                <Wrapper direction="col" gap="8px" className={styles.question_content}>
                  <Typography content={q.question} size="normal" color="primary" weight="normal" />
                </Wrapper>
              </Wrapper>
              <Button bgColor="primary">
                <Typography content="編集/返信" size="normal" color="primary" />
              </Button>
            </Wrapper>
            {q.answered && (
              <Wrapper direction='col' gap='8px'>
                <Wrapper direction='row' gap='8px' align='align-center'>
                  <img src={UserIcon} alt="ユーザー画像" />
                  <Typography content={q.userName!} size="normal" color="primary" />
                </Wrapper>
                <Wrapper className={styles.answered} padding="20px" align="align-start">
                  <Typography content={q.answer!} size="normal" color="gray" />
                </Wrapper>
              </Wrapper>
            )}
            {i !== dummyQuestions.length - 1 && (
              <Separator width="920px" />
            )}
          </>
        ))}
      </Wrapper>
    </Wrapper>
  );
}
