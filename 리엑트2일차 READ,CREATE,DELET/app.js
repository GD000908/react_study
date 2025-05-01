import { useState } from 'react';
import './App.css';

function App() {
  // 다음에 생성될 항목의 ID를 저장하는 상태값
  let [nextId, setNextId] = useState(4);

  // 현재까지의 게시물 데이터를 저장하는 상태값
  let [m_topics , setTopics] = useState([
    { id: 1, title: 'HTML', body: 'my HTML' },
    { id: 2, title: 'CSS', body: 'my CSS' },
    { id: 3, title: 'JavaScript', body: 'my JavaScript' }
  ]);

  // 현재 화면 모드를 저장하는 상태값 ("WELCOME", "READ", "CREATE")
  let [mode, setMode] = useState("WELCOME");

  // 현재 선택된 게시물의 id 저장
  let [id, setId] = useState(null);

  // 출력될 컴포넌트(Article 또는 Create 등)
  let content = null;

  // 화면 모드에 따라 content 구성
  if (mode === "WELCOME") {
    content = <Article title="Welcome state" name="state Web" />;
  }
  else if (mode === "READ") {
    let title, name = null;

    // 현재 선택된 id에 해당하는 게시물을 찾아서 제목/내용 추출
    for (let i = 0; i < m_topics.length; i++) {
      if (m_topics[i].id === id) {
        title = m_topics[i].title;
        name = m_topics[i].body;
      }
    }

    content = <Article title={title} name={name} />;
  }
  else if (mode === "CREATE") {
    // CREATE 모드일 때는 폼이 들어간 Create 컴포넌트를 렌더링
    content = <Create onCreate={(title, name) => {
      // 새로운 게시물 객체 생성
      let newTopic = { id: nextId, title: title, body: name };

      // 기존 m_topics 배열에 새 항목 추가 (불변성 유지 위해 복사 후 추가)
      setTopics([...m_topics, newTopic]);

      // 새로 만든 게시물을 읽기 모드로 전환
      setMode("READ");
      setId(nextId);

      // 다음 게시물 ID 증가
      setNextId(nextId + 1);
    }} />;
  }

  return (
    <div>
      {/* 제목 클릭 시 WELCOME 모드로 */}
      <Header title="React" onChangeMode={() => { setMode("WELCOME"); }} />

      {/* 목록 클릭 시 READ 모드로 전환하고 해당 id로 설정 */}
      <Nav topics={m_topics} onChangeMode={(id) => {
        setMode("READ");
        setId(id);
      }} />

      <hr />

      {/* 조건에 따라 결정된 content 컴포넌트 출력 */}
      {content}
      
      {/* 생성(Create) 버튼 - 모드를 CREATE로 전환 */}
      <a href='/create' onClick={(event) => {
        event.preventDefault();
        setMode("CREATE");
      }}>
        CREATE
      </a>

      {/* 삭제 버튼 - 현재 선택된 id를 제외한 나머지 항목들로 새 배열 생성 */}
      <input type='button' value='delete' onClick={() => {
        let newtopics = [];
        for (let i = 0; i < m_topics.length; i++) {
          if (m_topics[i].id !== id) {
            newtopics.push(m_topics[i]);
          }
        }
        // 삭제된 항목을 제외한 배열로 상태 갱신
        setTopics(newtopics);
      }} />
    </div>
  );
}

// 게시물 생성 폼 컴포넌트
function Create(props) {
  return (
    <article>
      <h2>생성 create</h2>
      <form onSubmit={(event) => {
        event.preventDefault(); // 폼 전송 시 새로고침 방지
        let title = event.target.title.value; // input에서 제목 추출
        let body = event.target.body.value;   // textarea에서 본문 추출
        props.onCreate(title, body);          // App에 전달한 onCreate 호출
      }}>
        <input type="text" name="title" placeholder='input title' /><br />
        <textarea name="body" placeholder='input body'></textarea><br />
        <input type="submit" value="send" />
      </form>
    </article>
  );
}

// 헤더 컴포넌트
function Header(pros) {
  return (
    <header>
      {/* 기본 클릭 시 이동은 안되지만 아래에서 모드 전환 */}
      <h1><a href='/'>{pros.title}</a></h1>
      <h1>
        <a href='/' onClick={(event) => {
          event.preventDefault(); // 새로고침 방지
          pros.onChangeMode();    // WELCOME으로 변경
        }}>
          {pros.title}
        </a>
      </h1>
    </header>
  );
}

// 게시물 목록 컴포넌트
function Nav(pros) {
  let list = [];

  for (let i = 0; i < pros.topics.length; i++) {
    let top = pros.topics[i];

    list.push(
      <li key={top.id}>
        <a
          id={top.id}
          href={'/read/' + top.id}
          onClick={(event) => {
            event.preventDefault(); // 새로고침 방지
            pros.onChangeMode(Number(event.target.id)); // READ 모드로 전환
          }}
        >
          {top.title} / {top.body}
        </a>
      </li>
    );
  }

  return (
    <nav>
      <ul>
        {list}
      </ul>
    </nav>
  );
}

// 본문 콘텐츠 출력용 컴포넌트
function Article(pros) {
  return (
    <article>
      <h2>{pros.title}</h2>
      <p>{pros.name}</p>
    </article>
  );
}

export default App;
