import React, { useMemo, useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Target,
  Users,
  CheckCircle2,
  Layout,
  Send,
  Gavel,
  AlertCircle,
  Calendar,
  PhoneCall,
  ArrowRightLeft,
  ShieldCheck,
  Link,
  Printer,
} from 'lucide-react';

const DECK_DATE = '2026.03.04';
const DECK_VERSION = 'v1.2';

const Slide = ({ children, title, pageNum, totalPages, className = '' }) => (
  <div
    className={`relative w-full h-full overflow-hidden bg-[linear-gradient(155deg,#f7fbff_0%,#f2f8ff_52%,#f8f9ff_100%)] flex flex-col p-6 md:p-8 font-[var(--font-body)] text-slate-800 ${className}`}
  >
    <div className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-cyan-200/35 blur-3xl" />
    <div className="relative z-10 flex justify-between items-center mb-4 md:mb-6">
      <h2 className="text-xl md:text-2xl font-[var(--font-display)] tracking-tight text-slate-900 border-l-4 border-blue-700 pl-4 leading-tight">{title}</h2>
      <span className="text-xs font-mono text-slate-500 bg-white/70 border border-white/90 rounded-full px-2.5 py-1">
        PAGE {String(pageNum).padStart(2, '0')} / {totalPages}
      </span>
    </div>
    <div className="relative z-10 flex-1 overflow-y-auto pr-1">{children}</div>
    <div className="relative z-10 mt-4 border-t border-slate-200/90 pt-3 flex justify-between items-center text-[9px] md:text-[10px] text-slate-500 uppercase tracking-widest">
      <div>Project: Moving LP + GAS Automation</div>
      <div>
        Client: Kei mb | {DECK_DATE} {DECK_VERSION}
      </div>
    </div>
  </div>
);

const BentoBox = ({ children, title, icon: Icon, color = 'blue', className = '' }) => {
  const colorMap = {
    blue: 'bg-white/90 border-blue-100 shadow-[0_10px_24px_rgba(30,64,175,0.07)] backdrop-blur-[2px]',
    orange: 'bg-orange-50/90 border-orange-100 shadow-[0_10px_24px_rgba(194,65,12,0.06)] backdrop-blur-[2px]',
    gray: 'bg-slate-50/90 border-slate-200 shadow-[0_10px_24px_rgba(15,23,42,0.06)]',
  };
  return (
    <div className={`rounded-xl border p-4 ${colorMap[color]} ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-2">
          {Icon && <Icon className="w-4 h-4 text-blue-700" />}
          <h3 className="font-bold text-[11px] md:text-xs text-slate-700 uppercase tracking-wider">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

const getIsPrintMode = () => new URLSearchParams(window.location.search).get('print') === '1';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isPrintMode = getIsPrintMode();
  const totalPages = 10;

  const shareUrl = useMemo(() => {
    const u = new URL(window.location.href);
    u.searchParams.delete('print');
    return u.toString();
  }, []);

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('共有URLをコピーしました');
    } catch {
      alert('コピーに失敗しました。URLを手動コピーしてください。');
    }
  };

  const openPrintMode = () => {
    const u = new URL(window.location.href);
    u.searchParams.set('print', '1');
    window.open(u.toString(), '_blank', 'noopener,noreferrer');
  };

  const slides = [
    (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="mb-4 bg-blue-700 text-white px-3 py-1 text-[10px] font-bold rounded-full">PROJECT PROPOSAL</div>
        <h1 className="text-4xl md:text-5xl font-[var(--font-display)] tracking-tight mb-4 text-slate-900 leading-tight">
          引越し一括見積LP制作
          <br />& GAS自動化 構成案
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl font-light leading-relaxed">
          高品質なリード獲得と自動転送システムの構築による、
          <br className="hidden md:block" />
          営業効率の最大化に向けた要件定義サマリー
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {['最大8セクション構成', 'スマホCV導線最優先', '最短10営業日想定'].map((chip) => (
            <span key={chip} className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-blue-100 text-blue-800 font-bold">
              {chip}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6 w-full max-w-3xl border-t border-slate-200 pt-8">
          <div>
            <p className="text-[10px] text-slate-400 uppercase mb-1">Client</p>
            <p className="font-bold text-sm">Kei mb 様</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase mb-1">Date</p>
            <p className="font-bold text-sm">
              {DECK_DATE} ({DECK_VERSION})
            </p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase mb-1">Estimate</p>
            <p className="font-bold text-sm text-blue-600">
              ¥100,000 <span className="text-[9px] text-slate-400">(税別)</span>
            </p>
          </div>
        </div>
      </div>
    ),

    (
      <div className="flex flex-col gap-4 h-full">
        <div className="grid grid-cols-3 gap-4">
          <BentoBox title="プロジェクトの目的" icon={Target}>
            <p className="text-xs leading-relaxed text-slate-600 font-medium">
              大手比較サイトよりも「質の高いリード」を低コストで獲得。提携業者へリアルタイム転送する仕組みを構築。
            </p>
          </BentoBox>
          <BentoBox title="一次CV（最優先）" icon={CheckCircle2}>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-0.5">フォーム送信</p>
            <p className="text-[10px] text-slate-500">LPからの正確な情報入力</p>
          </BentoBox>
          <BentoBox title="二次CV（成約）" icon={CheckCircle2}>
            <p className="text-xl md:text-2xl font-black text-slate-400 mb-0.5">訪問・電話見積</p>
            <p className="text-[10px] text-slate-500">提携業者による成約</p>
          </BentoBox>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-around flex-1">
          {[
            { label: 'LP訪問', role: 'USER', icon: Users },
            { label: 'フォーム送信', role: 'SYSTEM', icon: Send, highlight: true },
            { label: '自動転送', role: 'PARTNER', icon: ArrowRightLeft },
            { label: '成約', role: 'RESULT', icon: CheckCircle2, accent: true },
          ].map((step, i, arr) => (
            <React.Fragment key={i}>
              <div className="text-center">
                <div className={`text-[10px] font-bold mb-2 ${step.accent ? 'text-orange-500' : 'text-blue-600'}`}>{step.role}</div>
                <div
                  className={`h-12 w-12 md:h-14 md:w-14 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    step.highlight
                      ? 'bg-blue-600 text-white shadow-lg'
                      : step.accent
                        ? 'bg-orange-50 text-orange-500 border border-orange-100'
                        : 'bg-blue-50 text-blue-600 border border-blue-100'
                  }`}
                >
                  <step.icon size={24} />
                </div>
                <div className="text-[11px] font-bold text-slate-700">{step.label}</div>
              </div>
              {i < arr.length - 1 && <ChevronRight className="text-slate-300 w-4 h-4" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    ),

    (
      <div className="grid grid-cols-2 gap-6 h-full">
        <BentoBox title="月間目標 KPI (案)" className="flex flex-col justify-center gap-6">
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-slate-100 pb-3">
              <span className="text-xs text-slate-500 font-bold">一次CV数</span>
              <span className="text-3xl font-black text-blue-600 tracking-tighter">
                4 〜 10 <span className="text-[10px] text-slate-400">件</span>
              </span>
            </div>
            <div className="flex items-end justify-between border-b border-slate-100 pb-3">
              <span className="text-xs text-slate-500 font-bold">許容CPA</span>
              <span className="text-3xl font-black text-slate-800 tracking-tighter">
                5,000 <span className="text-[10px] text-slate-400">円以内</span>
              </span>
            </div>
            <div className="flex items-end justify-between border-b border-slate-100 pb-3">
              <span className="text-xs text-slate-500 font-bold">リード供給先数</span>
              <span className="text-3xl font-black text-slate-800 tracking-tighter">
                5 〜 10 <span className="text-[10px] text-slate-400">社</span>
              </span>
            </div>
          </div>
        </BentoBox>
        <BentoBox title="成功条件の定義" icon={ShieldCheck} className="flex flex-col justify-center">
          <ul className="space-y-4">
            {[
              { t: '情報の正確性', d: '不備率を5%以下に抑制' },
              { t: 'リード転送速度', d: '送信から30秒以内に通知' },
              { t: 'ROIの健全性', d: '獲得コストと収益のバランス' },
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <div className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">{i + 1}</div>
                <div>
                  <p className="font-bold text-xs text-slate-800">{item.t}</p>
                  <p className="text-[10px] text-slate-500">{item.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </BentoBox>
      </div>
    ),

    (
      <div className="grid grid-cols-2 gap-6 h-full">
        <div className="flex flex-col gap-4">
          <h3 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">TARGET USERS</h3>
          <div className="grid grid-cols-2 gap-2">
            {['単身者', '家族', '学生', '急ぎの転勤', '近距離引越', '長距離引越'].map((item) => (
              <div key={item} className="bg-white border border-slate-200 rounded-lg py-3 px-2 text-center text-xs font-bold text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
            幅広い層に対応しつつも、特に「丁寧な対応」と「料金の透明性」を求める層を主軸に訴求を構成。
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-1">UNIQUE SELLING PROPOSITIONS</h3>
          <div className="space-y-2">
            {[
              { t: '地域密着・優良業者限定', d: '信頼性を担保した厳選紹介' },
              { t: '高品質リード（成約重視）', d: '成約に近いリードを創出' },
              { t: '無駄のない料金体系', d: '大手比で半額相当の獲得コスト' },
            ].map((usp, i) => (
              <BentoBox key={i} className="border-l-4 border-l-blue-600 !p-3">
                <p className="font-bold text-xs mb-0.5 text-slate-800">{usp.t}</p>
                <p className="text-[10px] text-slate-500">{usp.d}</p>
              </BentoBox>
            ))}
          </div>
        </div>
      </div>
    ),

    (
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-8 grid grid-cols-2 gap-2">
          {[
            { id: 1, name: 'FV', desc: '入力開始導線最優先' },
            { id: 2, name: '特長', desc: '地域密着・信頼感' },
            { id: 3, name: '3つのメリット', desc: '他社比較・優位性' },
            { id: 4, name: '利用の流れ', desc: '簡単3ステップ' },
            { id: 5, name: 'ユーザーの声', desc: '実績・社会的証明' },
            { id: 6, name: 'FAQ', desc: '懸念点の事前払拭' },
            { id: 7, name: 'フォーム', desc: 'スマホ最適化UI' },
            { id: 8, name: 'フッター', desc: '法的表記・会社概要' },
          ].map((sec) => (
            <div key={sec.id} className="bg-white border border-slate-200 rounded-lg p-2 flex gap-3 items-center">
              <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center font-mono text-[10px] font-bold text-slate-400 shrink-0">{sec.id}</div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-slate-800 truncate">{sec.name}</p>
                <p className="text-[9px] text-slate-400 uppercase tracking-tighter truncate">{sec.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-4 bg-slate-200 rounded-xl flex items-center justify-center p-3">
          <div className="w-full bg-white rounded shadow-xl h-full flex flex-col items-center p-1.5 overflow-hidden relative border border-slate-300">
            <div className="w-full h-10 bg-blue-100 rounded mb-1 flex items-center px-2 gap-1">
              <div className="w-3/5 h-1.5 bg-blue-600 rounded" />
              <div className="w-2/5 h-4 bg-orange-500 rounded" />
            </div>
            <div className="w-full space-y-1.5 px-1">
              <div className="w-full h-6 bg-slate-50 rounded border border-slate-100" />
              <div className="w-full h-10 bg-slate-50 rounded border border-slate-100" />
              <div className="w-full h-20 bg-blue-600 rounded opacity-10 flex items-center justify-center text-[9px] font-bold">FORM</div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </div>
    ),

    (
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-7 h-full">
          <BentoBox title="フォーム項目一覧" icon={Layout} className="h-full">
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px]">
              {[
                { n: '氏名', r: true },
                { n: '電話番号', r: true },
                { n: '現住所', r: true },
                { n: '引越先住所', r: true },
                { n: '人数', r: true },
                { n: 'メール', r: false },
                { n: '引越希望日', r: false },
                { n: '建物タイプ', r: false },
                { n: 'その他要望', r: false },
              ].map((item, i) => (
                <div key={i} className="flex justify-between border-b border-slate-50 py-1.5">
                  <span className="font-bold text-slate-700">{item.n}</span>
                  <span className={item.r ? 'text-red-500 font-bold' : 'text-slate-400'}>{item.r ? '必須' : '任意'}</span>
                </div>
              ))}
            </div>
          </BentoBox>
        </div>
        <div className="col-span-5 flex flex-col gap-3 h-full">
          <BentoBox title="送信後導線" color="orange" icon={PhoneCall} className="flex-1">
            <ul className="text-[10px] space-y-2">
              <li className="flex gap-2">
                <CheckCircle2 size={12} className="text-orange-500 shrink-0 mt-0.5" />
                <span>
                  <strong>サンクス画面:</strong> 計測タグ設置
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 size={12} className="text-orange-500 shrink-0 mt-0.5" />
                <span>
                  <strong>自動返信:</strong> ユーザー控え送信
                </span>
              </li>
              <li className="flex gap-2 text-orange-600 font-bold">
                <CheckCircle2 size={12} className="shrink-0 mt-0.5" />
                <span>電話誘導ボタンの大型配置</span>
              </li>
            </ul>
          </BentoBox>
          <div className="p-3 bg-blue-600 rounded-xl text-white">
            <p className="text-[9px] opacity-70 uppercase mb-0.5">Tech Stack</p>
            <p className="font-mono text-[11px] font-bold">Google Forms + GAS</p>
          </div>
        </div>
      </div>
    ),

    (
      <div className="h-full flex flex-col">
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex-1 flex flex-col">
          <h3 className="text-xs font-bold text-slate-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
            <ArrowRightLeft size={14} /> 転送ロジック (分岐フロー)
          </h3>
          <div className="flex flex-col items-center flex-1 justify-center gap-2">
            <div className="w-48 py-2 bg-blue-50 border border-blue-200 rounded text-[10px] font-bold text-center">ユーザーがフォーム送信</div>
            <div className="h-4 border-l border-dashed border-slate-300" />
            <div className="w-64 py-3 bg-blue-600 text-white rounded shadow text-center px-2">
              <p className="text-[10px] font-bold leading-tight">
                GASによる自動処理
                <br />
                <span className="text-[9px] font-normal opacity-80">スプレッドシートへのDB格納</span>
              </p>
            </div>
            <div className="h-4 border-l border-dashed border-slate-300" />
            <div className="grid grid-cols-2 gap-8 relative w-full max-w-lg">
              <div className="absolute top-[-8px] left-1/4 right-1/4 border-t border-slate-300" />
              <div className="flex flex-col items-center">
                <div className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded mb-1 border border-blue-100">条件合致</div>
                <div className="w-40 p-2 bg-white border border-blue-600 rounded text-center text-[10px] font-bold text-blue-700">
                  該当業者(最大10社)へ
                  <br />即時通知メール
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded mb-1 border border-slate-200">合致なし</div>
                <div className="w-40 p-2 bg-white border border-slate-200 rounded text-center text-[10px] font-bold text-slate-400">
                  全提携業者へ
                  <br />一斉転送
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    (
      <div className="h-full flex flex-col gap-4">
        <BentoBox title="法務・表現ガイドライン" icon={Gavel} color="orange" className="flex-1">
          <div className="grid grid-cols-2 gap-6 h-full">
            <div className="bg-white/50 p-3 rounded-lg">
              <p className="text-[10px] font-bold text-orange-600 mb-2 uppercase tracking-wider">NG EXPRESSIONS</p>
              <ul className="space-y-2">
                {['「最安」「必ず安くなる」等の断定', '提携先以外の特定業者名の無断記載', '誤解を招く料金保証・還元表現'].map((text, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] text-slate-600">
                    <span className="text-orange-500 font-bold">×</span> <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/50 p-3 rounded-lg">
              <p className="text-[10px] font-bold text-blue-600 mb-2 uppercase tracking-wider">COMPLIANCE RULES</p>
              <ul className="space-y-2">
                {['個人情報保護方針の明示と同意必須', '「最大10社」等の透明性の高い表現', '紹介先業者リストへのアクセス性確保'].map((text, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] text-slate-600">
                    <CheckCircle2 size={12} className="text-blue-500 mt-0.5 shrink-0" /> <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </BentoBox>
      </div>
    ),

    (
      <div className="grid grid-cols-2 gap-4 h-full">
        <BentoBox title="プロジェクトスコープ" icon={ShieldCheck}>
          <div className="space-y-3">
            <div>
              <div className="bg-blue-600 text-white px-2 py-0.5 rounded text-[9px] font-bold inline-block mb-1.5 uppercase">In-Scope</div>
              <ul className="text-[10px] space-y-1 text-slate-600 list-disc pl-4 leading-relaxed">
                <li>LP制作 (1枚/最大8節/レスポンシブ)</li>
                <li>修正対応 (2往復まで)</li>
                <li>Googleフォーム/GAS (基本連携)</li>
                <li>最大10社転送 (簡易3分岐ルール)</li>
              </ul>
            </div>
            <div>
              <div className="bg-slate-200 text-slate-500 px-2 py-0.5 rounded text-[9px] font-bold inline-block mb-1.5 uppercase">Out-of-Scope</div>
              <ul className="text-[10px] space-y-1 text-slate-400 list-disc pl-4 leading-relaxed">
                <li>SMS認証 / 業者別API連携</li>
                <li>高機能管理画面 / 広告運用代行</li>
                <li>3往復目以降の修正</li>
              </ul>
            </div>
          </div>
        </BentoBox>
        <BentoBox title="未確定事項・確認依頼" icon={AlertCircle} color="orange">
          <div className="space-y-1.5">
            {[
              { l: '素材', c: 'ロゴ・写真素材の支給' },
              { l: '設定', c: '転送先業者メールアドレス一覧' },
              { l: '環境', c: '管理用Googleアカウントの確定（3/7希望）' },
              { l: '文言', c: '通知先・CTA最終文言の確定' },
              { l: '運用', c: 'リード課金単価と公開希望日（3月中旬想定）' },
            ].map((item, i) => (
              <div key={i} className="p-2 border border-orange-200 rounded bg-white flex items-center gap-2">
                <span className="text-[9px] font-bold text-orange-600 bg-orange-100 px-1 rounded shrink-0">{item.l}</span>
                <span className="text-[10px] text-slate-600 truncate">{item.c}</span>
              </div>
            ))}
          </div>
        </BentoBox>
      </div>
    ),

    (
      <div className="flex flex-col gap-4 h-full">
        <div className="grid grid-cols-12 gap-4 flex-1">
          <div className="col-span-5 h-full">
            <BentoBox title="承認ゲート計画" icon={Calendar} className="h-full">
              <div className="space-y-2">
                {[
                  'Gate 0: 案件開始承認',
                  'Gate 1: 要件・構成FIX',
                  'Gate 4: 制作着手',
                  'Gate 5: クライアント確認',
                  'Gate 6: 転送テスト',
                  'Gate 10: 公開・納品',
                ].map((gate, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] text-slate-400">
                    <div className="w-2.5 h-2.5 rounded-full border border-slate-300 shrink-0" />
                    <span className="truncate">{gate}</span>
                  </div>
                ))}
              </div>
            </BentoBox>
          </div>
          <div className="col-span-7 flex flex-col gap-3">
            <h3 className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">IMMEDIATE NEXT ACTIONS</h3>
            {[
              { id: '01', t: '本構成案の承認', h: true },
              { id: '02', t: '業者メール一覧のご提供', h: false },
              { id: '03', t: '管理用Googleアカウント共有（3/7目標）', h: false },
            ].map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-3 rounded-xl border ${item.h ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white border-slate-200 shadow-sm'}`}
              >
                <div className={`text-xl font-black italic ${item.h ? 'opacity-50' : 'text-slate-200'}`}>{item.id}</div>
                <div className="font-bold text-xs">{item.t}</div>
                <ChevronRight className={`ml-auto w-4 h-4 ${item.h ? 'text-white' : 'text-slate-300'}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center py-2 bg-slate-900 text-white rounded-xl">
          <p className="text-[8px] uppercase tracking-[0.4em] font-light opacity-60">Prepared by Proposal Designer</p>
          <p className="text-xs font-bold">Kei mb 様 制作担当PM 宛</p>
        </div>
      </div>
    ),
  ];

  const pageTitles = [
    'Cover',
    'プロジェクト目的とCV定義',
    'KPIと成功条件',
    'ターゲットとUSP',
    'LP情報設計',
    'フォーム要件と送信後導線',
    '提携業者転送ロジック',
    '法務・表現ガイドライン',
    'スコープ & 未確定事項',
    '次アクションと承認ゲート',
  ];

  if (isPrintMode) {
    return (
      <div className="bg-white p-4 md:p-6">
        <style>{`
          @media print {
            @page { size: A4 landscape; margin: 8mm; }
            .no-print { display: none !important; }
            .print-sheet { break-after: page; page-break-after: always; }
          }
        `}</style>

        <div className="no-print sticky top-2 z-20 mb-4 flex justify-end">
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white text-sm">
            <Printer size={16} /> PDF保存
          </button>
        </div>

        {slides.map((slide, i) => (
          <section key={i} className="print-sheet mb-6">
            <div className="aspect-video w-full max-w-6xl mx-auto shadow border border-slate-200 rounded-lg overflow-hidden bg-white">
              <Slide title={pageTitles[i]} pageNum={i + 1} totalPages={totalPages}>
                {slide}
              </Slide>
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[linear-gradient(180deg,#dbeafe_0%,#e0f2fe_45%,#eef2ff_100%)] flex items-center justify-center p-4">
      <div className="pointer-events-none absolute -top-28 left-1/3 h-72 w-72 rounded-full bg-white/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="absolute top-4 right-6 flex gap-2 z-20">
        <button
          onClick={copyShareUrl}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs bg-white/90 border border-white rounded shadow hover:bg-white"
        >
          <Link size={14} /> URLコピー
        </button>
        <button
          onClick={openPrintMode}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs bg-blue-700 text-white rounded shadow hover:bg-blue-800"
        >
          <Printer size={14} /> PDFモード
        </button>
      </div>

      <div className="relative aspect-video w-full max-w-5xl shadow-2xl overflow-hidden rounded-xl bg-white border border-blue-100">
        <Slide className="slide-enter" key={currentSlide} title={pageTitles[currentSlide]} pageNum={currentSlide + 1} totalPages={totalPages}>
          {slides[currentSlide]}
        </Slide>

        <div className="absolute bottom-4 right-6 flex gap-2 z-10">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            className="p-2 bg-white/90 border border-slate-200 rounded shadow hover:bg-slate-50 disabled:opacity-30 backdrop-blur-sm"
            disabled={currentSlide === 0}
            title="Previous Page"
          >
            <ChevronLeft size={18} className="text-slate-600" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => Math.min(totalPages - 1, prev + 1))}
            className="p-2 bg-blue-600/90 text-white rounded shadow hover:bg-blue-700 disabled:opacity-30 backdrop-blur-sm"
            disabled={currentSlide === totalPages - 1}
            title="Next Page"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          className="absolute top-0 left-0 h-1.5 bg-[linear-gradient(90deg,#1d4ed8,#0ea5e9)] transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / totalPages) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default App;
