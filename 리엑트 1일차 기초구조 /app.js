// CSS 파일 불러오기 (스타일 정의)
import './App.css';

// 최상위 컴포넌트 App
function App() {

  // 항목(글 목록) 데이터: 객체 3개를 담은 배열
  let m_topics = [
    { id: 1, title: 'HTML', body: 'my html' },
    { id: 2, title: 'CSS', body: 'my css' },
    { id: 3, title: 'JavaScript', body: 'my js' }
  ];

  return (
    <div>

      {/* Header 컴포넌트 호출 (*) */}
      {/* onchangMode라는 props를 전달: 클릭 시 alert 띄움 */}
      <Header title="React" onchangMode={function () {
        alert('header');
      }}></Header> {/* (**) */}

      {/* Nav 컴포넌트 호출 (리스트와 클릭 핸들러 전달) (*) */}
      {/* 화살표 함수 사용: 클릭 시 id 값 전달하며 alert 실행 */}
      <Nav topics={m_topics} onchangMode={(id) => {
        alert('id:' + id);
      }}></Nav> {/* (**) */}

      {/* Article 컴포넌트 호출 - 단순 콘텐츠 표시용 (*) */}
      <Article title="Welcome" body="hello, Web"></Article> {/* (**) */}

      <hr />

      {/* 부모 컴포넌트에서 자식 컴포넌트로 name 전달 */}
      <h2>Parent Component</h2>
      <Child name="Hong" />
    </div>
  );
}


// 자식 컴포넌트 - props를 통해 name을 받음
function Child(props) {
  return (
    <div>
      <h3>Child Component</h3>
      <p>Hello, {props.name}</p> {/* props.name: 부모가 준 "Hong" */}
    </div>
  );
}


// Header 컴포넌트 정의
function Header(props) {
  return (
    <header>

      {/* a태그 클릭 시 → alert만 실행됨 (기본동작 있음) */}
      <h1><a href='/' onClick={function () {
        alert('click');
      }}>{props.title}</a></h1>

      {/* a태그 클릭 시 → 기본동작 막고 props.onchangMode() 실행 (*) */}
      <h1><a href='/' onClick={function (event) {
        event.preventDefault(); // a 태그의 페이지 이동 막음
        props.onchangMode();    // 부모(App)에서 전달한 함수 실행 (**)
      }}>{props.title}</a></h1>

    </header>
  );
}


// Nav 컴포넌트 정의
function Nav(props) {
  let list = [];

  // topics 배열을 순회하며 <li> 목록 생성
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i]; // 현재 topic

    list.push(
      <li key={t.id}>
        {/* a태그 클릭 시 id 전달하며 클릭 이벤트 실행 */}
        <a
          id={t.id}
          href={'/read/' + t.id}
          onClick={function (event) {
            event.preventDefault();              // 기본 이동 막기
            props.onchangMode(event.target.id); // App에서 받은 함수 호출 (*) → id 넘김 (**)
          }}
        >
          {t.title} / {t.body}
        </a>
      </li>
    );
  }

  return (
    <nav>
      <ul>
        {list} {/* 위에서 만든 목록 출력 */}
      </ul>
    </nav>
  );
}


// Article 컴포넌트 - 단순 콘텐츠 보여줌
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2> {/* App에서 받은 title 표시 */}
      <p>{props.body}</p>    {/* App에서 받은 body 표시 */}
    </article>
  );
}

export default App; // App 컴포넌트를 외부에서 사용할 수 있도록 내보냄
