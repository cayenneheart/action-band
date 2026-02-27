import { useState } from 'react';
import { CheckCircle2, ChevronRight, Plus, ArrowRight, BookOpen } from 'lucide-react';

type Tab = 'home' | 'declare' | 'activities' | 'detail';

interface Goal {
  id: string;
  title: string;
  deadline: string;
  band: string;
  status: 'active' | 'completed';
}

const mockBands = ['赤バンド (挑戦)', '青バンド (学び)', '緑バンド (習慣)'];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const renderHome = () => (
    <div className="space-y-12 pb-20 slide-up" style={{ animationDelay: '0ms' }}>
      <div className="text-center space-y-4 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
          実行バンドプロジェクト
        </h1>
        <p className="text-lg text-slate-500 font-light max-w-2xl mx-auto px-4">
          「今までやろうやろうと言ってたけどやってなかったこと」をやってみよう。<br />
          実行バンドのインセンティブを得て、一歩を踏み出すきっかけに。
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <CheckCircle2 className="mr-3 text-blue-500" />
            プロジェクトの進め方
          </h2>
          <div className="space-y-6 md:space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {[
              "友達などから実行バンドを引き継ぐ",
              "目標を決めて宣言する",
              "目標達成に向けて行動し、日記を書く",
              "達成したら次の人にバトンを渡す"
            ].map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative group">
                  {/* Number Badge */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-slate-100 group-hover:bg-blue-100 text-slate-500 group-hover:text-blue-600 shadow absolute left-4 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 font-semibold text-sm">
                    {idx + 1}
                  </div>

                  {/* Card Content */}
                  <div className={`w-full pl-12 ${isEven ? 'md:w-1/2 md:pl-0 md:pr-12' : 'md:w-1/2 md:ml-auto text-left'}`}>
                    <div className="p-4 md:p-5 rounded-xl glass-card transition duration-300 hover:scale-[1.02] bg-white/70">
                      <p className="font-medium text-slate-700">{step}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setActiveTab('declare')}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 flex items-center justify-center mx-auto"
            >
              目標を宣言する
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeclare = () => (
    <div className="max-w-xl mx-auto px-4 py-12 slide-up" style={{ animationDelay: '0ms' }}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800">目標の宣言</h2>
        <p className="text-slate-500 mt-2">あなたの決意をバンドに込めましょう</p>
      </div>

      <form className="glass-card p-6 md:p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setActiveTab('activities'); }}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">実行したいこと</label>
          <input type="text" required placeholder="例: 毎朝6時に起きてランニングする"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">目標期日</label>
          <input type="date" required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">使用するバンド</label>
          <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
            <option value="">バンドを選択してください...</option>
            {mockBands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40">
          この内容で宣言する
        </button>
      </form>
    </div>
  );

  const mockGoals: Goal[] = [
    { id: '1', title: '週に3回ジムに行く', deadline: '2026-12-31', band: '赤バンド (挑戦)', status: 'active' },
    { id: '2', title: '英会話を毎日20分勉強する', deadline: '2026-10-01', band: '青バンド (学び)', status: 'completed' },
    { id: '3', title: 'プログラミングでアプリを作る', deadline: '2026-08-15', band: '赤バンド (挑戦)', status: 'active' },
  ];

  const renderActivities = () => (
    <div className="max-w-6xl mx-auto px-4 py-12 slide-up" style={{ animationDelay: '0ms' }}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">取り組み一覧</h2>
          <p className="text-slate-500 mt-2">他のみんなの挑戦を見て、刺激をもらおう</p>
        </div>
      </div>

      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
        {['すべて', ...mockBands].map((tab, i) => (
          <button key={tab} className={`px-5 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockGoals.map((goal, idx) => (
          <div key={goal.id} className="glass-card p-6 flex flex-col cursor-pointer group" style={{ animationDelay: `${idx * 100}ms` }} onClick={() => { setSelectedGoal(goal); setActiveTab('detail'); }}>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                {goal.band}
              </span>
              {goal.status === 'completed' && (
                <span className="inline-flex items-center text-emerald-600">
                  <CheckCircle2 className="w-5 h-5 mr-1" />
                  <span className="text-xs font-semibold">達成済み</span>
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{goal.title}</h3>
            <div className="mt-auto pt-4 flex justify-between items-center text-sm text-slate-500 border-t border-slate-100">
              <span>期日: {goal.deadline}</span>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedGoal) return null;
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 slide-up">
        <button onClick={() => setActiveTab('activities')} className="mb-6 flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium">
          <ChevronRight className="w-5 h-5 rotate-180 mr-1" /> 一覧に戻る
        </button>

        <div className="glass-card p-8 mb-8">
          <div className="flex justify-between items-start mb-4">
            <span className="inline-flex py-1 px-3 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
              {selectedGoal.band}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-6">{selectedGoal.title}</h2>

          <div className="flex p-4 rounded-xl bg-slate-50 text-slate-700 items-center justify-between border border-slate-100">
            <span className="font-medium">目標期日: {selectedGoal.deadline}</span>
            {selectedGoal.status === 'active' ? (
              <button className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> 達成を報告
              </button>
            ) : (
              <span className="text-emerald-600 font-bold flex items-center"><CheckCircle2 className="w-5 h-5 mr-1" /> 達成済み</span>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-indigo-500" /> 日記 / 記録
          </h3>

          <div className="glass-card p-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Plus className="w-5 h-5" />
              </div>
              <div className="w-full">
                <textarea placeholder="今日の取り組みを記録しよう..." className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow min-h-[100px] resize-none" />
                <div className="mt-3 flex justify-end">
                  <button className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors">記録する</button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 glass-card">
              <p className="text-sm text-slate-500 mb-2 font-medium">2026-02-26 14:30</p>
              <p className="text-slate-700">今日は最初のステップとして準備を進めた！順調だ。</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      {/* Decorative background blobs */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-100/50 to-transparent -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl -z-10" />
      <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-blue-200/40 blur-3xl -z-10" />

      {/* Navigation Header */}
      <nav className="glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md mr-3">A</span>
            <span className="font-bold text-lg tracking-tight text-slate-800">Action Band</span>
          </div>

          <div className="hidden md:flex space-x-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
            <button onClick={() => setActiveTab('home')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'home' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>ホーム</button>
            <button onClick={() => setActiveTab('declare')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'declare' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>目標宣言</button>
            <button onClick={() => { setActiveTab('activities'); setSelectedGoal(null); }} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'activities' || activeTab === 'detail' ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}>取り組み</button>
          </div>

          <div className="md:hidden flex">
            {/* Mobile toggle button placeholder */}
            <button className="p-2 text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-4rem)]">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'declare' && renderDeclare()}
        {activeTab === 'activities' && renderActivities()}
        {activeTab === 'detail' && renderDetail()}
      </main>
    </div>
  );
}
