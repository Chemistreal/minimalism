const V2_STAGE_META=[
{icon:'🧺',intro:'당신의 물건은 얼마나 들어오고 있는가',hint:'구매 속도와 유입 구조를 먼저 봅니다.'},
{icon:'🛠️',intro:'당신은 얼마나 정확히 남기고 있는가',hint:'물건을 오래 쓰는 습관과 선별 기준을 봅니다.'},
{icon:'🏠',intro:'당신의 공간은 회복 장치인가',hint:'집의 회복감과 소유물 애착을 봅니다.'},
{icon:'🧭',intro:'무엇이 당신의 소비 욕망을 켜는가',hint:'지위소비와 비교 자극을 구분합니다.'},
{icon:'🌿',intro:'비운 자리를 무엇으로 채우는가',hint:'웰빙과 환경 효과를 함께 봅니다.'},
{icon:'✨',intro:'생활 서사의 균형을 확인하는 단계',hint:'응답 일관성과 전체 패턴을 마무리합니다.'}
];
const V2_TYPE_STYLE={
'가치 통합형 미니멀리스트':{icon:'✦',color:'#7fffd4',key:'OO님은 물건을 줄이는 사람이기보다 삶의 기준을 선명하게 세우는 사람입니다.'},
'지속가능 실천형':{icon:'♻',color:'#83f2b0',key:'OO님은 덜 사고 오래 쓰는 행동을 삶의 윤리와 연결하는 사람입니다.'},
'큐레이션형 미니멀리스트':{icon:'◇',color:'#8db0ff',key:'OO님은 적게 갖기보다 정확히 남기는 감각이 뛰어난 사람입니다.'},
'공간 회복형':{icon:'⌂',color:'#7ae7ff',key:'OO님은 공간의 여백을 통해 마음의 여백을 회복하는 사람입니다.'},
'신중 소비 전환형':{icon:'⏳',color:'#ffd98d',key:'OO님은 소비 전 멈출 수 있는 힘을 이미 갖고 있으며 지금은 정교하게 다듬는 단계입니다.'},
'미니멀 스타일 소비형':{icon:'◻',color:'#ff9bd0',key:'OO님은 미니멀한 이미지에 끌리지만 이제는 실제 소유량을 줄이는 방향으로 전환할 차례입니다.'},
'소유물 애착 저항형':{icon:'⌘',color:'#ffb694',key:'OO님에게 정리는 버리기가 아니라 기억을 물건으로부터 다시 회수하는 과정입니다.'},
'물질주의 갈등형':{icon:'◆',color:'#ffb1a8',key:'OO님은 좋은 물건과 좋은 삶 사이의 관계를 다시 설계해야 하는 사람입니다.'},
'비교·욕망 취약형':{icon:'≈',color:'#ffd089',key:'OO님에게 필요한 첫 번째 절제는 소비보다 비교 자극을 줄이는 일입니다.'},
'강제 절약 오인형':{icon:'⌁',color:'#c0d3ff',key:'OO님은 적게 쓰는 것만으로는 충분하지 않으며 비운 자리를 좋은 경험으로 채워야 합니다.'},
'정리 피로형':{icon:'☰',color:'#f4c78d',key:'OO님에게 미니멀리즘은 빠른 정리가 아니라 작은 회복의 반복이어야 합니다.'},
'균형 전환형':{icon:'⟡',color:'#9ee5ff',key:'OO님은 미니멀리즘으로 이동 중이며 지금은 가장 낮은 축 하나를 정교하게 다듬을 단계입니다.'}
};
function v2Name(){return (document.getElementById('nameInput')?.value||'나').trim()||'나'}
function v2SetGauge(score){const c=document.getElementById('gaugeCircle');if(!c)return;const len=301.59;c.style.transition='none';c.style.strokeDashoffset=len;setTimeout(()=>{c.style.transition='stroke-dashoffset 1.1s ease';c.style.strokeDashoffset=(len-len*score/100).toFixed(2)},60)}
function v2ApplyType(result){const st=V2_TYPE_STYLE[result?.type?.name]||V2_TYPE_STYLE['균형 전환형'];document.documentElement.style.setProperty('--type',st.color);const icon=document.getElementById('typeIcon');if(icon)icon.textContent=st.icon;const key=document.getElementById('keyline');if(key)key.textContent=st.key.replaceAll('OO님',v2Name()+'님');v2SetGauge(result.overall||0)}
function v2RenderStageMeta(){const box=document.getElementById('stageHero');if(!box||typeof stage==='undefined')return;const meta=V2_STAGE_META[stage]||V2_STAGE_META[0];box.innerHTML=`<div class="stageIcon">${meta.icon}</div><div><div style="font-size:20px;font-weight:1000;margin-bottom:4px">${meta.intro}</div><div style="color:var(--muted);line-height:1.7">${meta.hint}</div><div class="stageHint">${stage+1}단계를 마치면 ${stage<5?'다음 분석 단계로 이동합니다.':'최종 개인 리포트가 생성됩니다.'}</div></div>`}
const __oldRenderStage=window.renderStage;window.renderStage=function(){__oldRenderStage();v2RenderStageMeta()};
function v2Toast(msg){const t=document.getElementById('completeToast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(t._v2);t._v2=setTimeout(()=>t.classList.remove('show'),1400)}
const __oldNextStage=window.nextStage;window.nextStage=function(){const before=stage;__oldNextStage();if(stage!==before)v2Toast(`${before+1}단계 분석 완료`)};
const __oldAnalyze=window.analyzeWithFx;window.analyzeWithFx=async function(skip){const steps=['소유량 패턴 분석 중','구매욕망 신호 분석 중','공간 회복감 계산 중','소유물 애착 구조 해석 중','논문 기반 유형 매칭 중','개인 리포트 생성 중'];const loader=document.getElementById('loader'),step=document.getElementById('loaderStep');if(loader&&step){loader.classList.add('on');for(const s of steps){step.textContent=s;await new Promise(r=>setTimeout(r,230))}loader.classList.remove('on')}return __oldAnalyze(skip)};
const __oldRenderR=window.renderR;window.renderR=function(result){__oldRenderR(result);v2ApplyType(result)};
setTimeout(()=>v2RenderStageMeta(),200);