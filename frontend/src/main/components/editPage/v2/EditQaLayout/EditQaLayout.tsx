import styles from '@/main/components/editPage/v2/EditQaLayout/EditQaLayout.module.scss';
import Wrapper from '@/main/common/Wrapper';
import Typography from '@/main/common/Typography';
import Button from '@/main/common/Button';
import SearchBox from '@/main/common/SearchBox';
import { useState } from 'react';
import Separator from '@/main/common/Separator';
import UserIcon from '@/main/assets/UserIcon.svg'
import AddIcon from '@/main/assets/AddIcon.svg'
import EditQuestionModal from '@/main/components/editPage/v2/EditQaLayout/modals/EditQuestionModal';
import EditAnswerModal from '@/main/components/editPage/v2/EditQaLayout/modals/EditAnswerModal';
// ダミーデータ
const dummyQuestions = [
  {
    id: 1,
    question: '営業時間は何時から何時までですか？',
    answers: [
      { answer: '営業時間は10:00〜20:00です。', userName: '山田太郎' },
      { answer: '平日は10:00〜19:00、土日は10:00〜20:00です。', userName: '佐藤花子' },
    ],
  },
  {
    id: 2,
    question: '駐車場はありますか？',
    answers: [
      { answer: 'はい、店舗前に10台分ございます。', userName: '鈴木一郎' },
      { answer: '近隣にコインパーキングもあります。', userName: '田中美咲' },
    ],
  },
  {
    id: 3,
    question: 'クレジットカードは使えますか？',
    answers: [
      { answer: 'はい、VISA・MasterCard・JCBがご利用いただけます。', userName: '佐藤花子' },
      { answer: '電子マネーも一部対応しています。', userName: '山田太郎' },
    ],
  },
  {
    id: 4,
    question: 'ペット同伴は可能ですか？',
    answers: [
      { answer: '小型犬のみ同伴可能です。', userName: '田中美咲' },
      { answer: 'ペット用カートをご利用ください。', userName: '鈴木一郎' },
    ],
  },
  {
    id: 5,
    question: '定休日はいつですか？',
    answers: [
      { answer: '毎週水曜日が定休日です。', userName: '鈴木一郎' },
      { answer: '祝日の場合は翌日が休みです。', userName: '山田太郎' },
    ],
  },
];


export default function EditQaLayout() {
  const [search, setSearch] = useState('');
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [faqModalInitialValues, setFaqModalInitialValues] = useState<{ question: string } | undefined>(undefined);
  const [faqModalTitle, setFaqModalTitle] = useState('よくある質問を作成');
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [answerModalTitle, setAnswerModalTitle] = useState('');
  const [answerModalInitialValues, setAnswerModalInitialValues] = useState<{ answer: string } | undefined>(undefined);
  const [answerEditTarget, setAnswerEditTarget] = useState<{ questionId: number; answerIndex?: number; isReply?: boolean } | null>(null);

  // 新規作成
  const handleOpenCreateFaq = () => {
    setFaqModalTitle('よくある質問を作成');
    setFaqModalInitialValues({ question: '' });
    setFaqModalOpen(true);
  };

  // 編集
  const handleOpenEditFaq = (q: { question: string }) => {
    setFaqModalTitle('よくある質問を編集');
    setFaqModalInitialValues({ question: q.question });
    setFaqModalOpen(true);
  };

  // 仮のonSubmit
  const handleFaqSubmit = async (data: { question: string }) => {
    setFaqModalOpen(false);
  };

  // 回答編集
  const handleOpenEditAnswer = (qId: number, ans: { answer: string; userName: string }, answerIndex: number) => {
    setAnswerModalTitle('回答を編集');
    setAnswerModalInitialValues({ answer: ans.answer });
    setAnswerEditTarget({ questionId: qId, answerIndex });
    setAnswerModalOpen(true);
  };

  // 新規回答
  const handleOpenReply = (qId: number) => {
    setAnswerModalTitle('新規回答');
    setAnswerModalInitialValues({ answer: '' });
    setAnswerEditTarget({ questionId: qId, isReply: true });
    setAnswerModalOpen(true);
  };

  // 回答モーダル onSubmit（ダミー）
  const handleAnswerSubmit = async (data: { answer: string }) => {
    setAnswerModalOpen(false);
  };

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
          <Button bgColor="primary" onClick={handleOpenCreateFaq}>
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
              <Button bgColor="primary" onClick={() => handleOpenEditFaq(q)}>
                <Typography content="編集" size="normal" color="primary" />
              </Button>
            </Wrapper>
            {q.answers.length > 0 && q.answers.map((ans, idx) => (
              <Wrapper key={idx} gap="10px" align="align-end">
                <Wrapper direction='col' gap='8px'>
                  <Wrapper direction='row' gap='8px' align='align-center'>
                    <img src={UserIcon} alt="ユーザー画像" />
                    <Typography content={ans.userName} size="normal" color="primary" />
                  </Wrapper>
                  <Wrapper className={styles.answered} padding="20px" align="align-start">
                    <Typography content={ans.answer} size="normal" color="gray" />
                  </Wrapper>
                </Wrapper>
                <Button bgColor="primary" onClick={() => handleOpenEditAnswer(q.id, ans, idx)}>
                  <Typography content="編集" size="normal" color="primary" />
                </Button>
              </Wrapper>
            ))}
            <Wrapper>
              <Button bgColor="primary" onClick={() => handleOpenReply(q.id)}>
                <Typography content="返信" size="normal" color="primary" />
              </Button>
            </Wrapper>
            {i !== dummyQuestions.length - 1 && (
              <Separator width="920px" />
            )}
          </>
        ))}
      </Wrapper>
      <EditQuestionModal
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
        title={faqModalTitle}
        onSubmit={handleFaqSubmit}
        initialValues={faqModalInitialValues}
      />
      <EditAnswerModal
        isOpen={answerModalOpen}
        onClose={() => setAnswerModalOpen(false)}
        title={answerModalTitle}
        onSubmit={handleAnswerSubmit}
        initialValues={answerModalInitialValues}
      />
    </Wrapper>
  );
}
