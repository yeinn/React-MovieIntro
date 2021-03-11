import React, { Component } from 'react';
import styled from 'styled-components';
import { confetti } from 'dom-confetti';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-image: ${props =>
    props.backgroundImage
      ? `linear-gradient(rgba(245, 245, 245, 0), rgba(245, 245, 245, 0)), url(${props.backgroundImage})`
      : ''};
  background-position: 50% 50%;
  background-size: cover;
  padding: 2rem;
  transition: 0.25s;
  &:hover {
    padding-top: 10rem;
    padding-bottom: 10rem;
    > div.sub-introduce {
      display: flex;
      flex-direction: column;
    }
    > div.like-button {
      display: flex;
      justify-content: center;
    }
  }

  > span.title {
    font-size: 3.5rem;
    color: #61dafb;
    margin-bottom: 2rem;
    cursor: pointer;
  }
  > div.genre {
    display: flex;
    margin-bottom: 1rem;

    > span {
      margin-right: 1rem;
      font-size: 1rem;
      color: #f5f5f5;
    }
  }
  > span.sub {
    font-size: 2rem;
    color: #f5f5f5;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  > div.sub-introduce {
    display: none;
    padding-top: 2rem;
    transition: 0.25s;

    > span {
      color: white;
      line-height: 1.5;
      font-size: 1.5rem;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
    }
  }
  > div.like-button {
    display: none;
    padding-top: 4rem;

    > span {
      width: 100px;
      height: 100px;
      cursor: pointer;
      background-image: ${props =>
        props.likeImage
          ? `linear-gradient(rgba(245, 245, 245, 0), rgba(245, 245, 245, 0)), url(${props.likeImage})`
          : ''};
      background-position: 50% 50%;
      background-size: cover;
    }
  }
`;

class MovieList extends Component {

    //confetti 모듈일 이용해 좋아요 버튼을 만들고 효과 삽입
    //props로 받은 영화의 리스트 만큼 createRef(좋아요) 생성
    domConfettiRefs = this.props.data.map(() => React.createRef());

    // confetti모듈에 dom요소 접근
    showParadise = idx => {
        confetti(this.domConfettiRefs[idx].current);
    }

    //history.push를 통한 이동
    historyPush = (movieName) => {
      this.props.history.push(`${movieName}`)
    }


    render() {
        const convertEnterToLine = someString => {

        //string 내용을 map으로 /n 기준으로 나눠서 순서대로 출력 메소드
            const strings = someString.split('\n');
            return strings.map((values, idx) => {
                return <span key={idx}>{values}</span>
            })
        }

        //장르 리스트를 map으로 순서대로 출력 메소드
        const showGenre = genres => {
            return genres.map((genre, idx) => {
            return <span key={idx}>{genre}</span>
            })
        }

        //리스트 출력 메소드
        const renderMovieList = lists => {

            //영화 리스트를 map 함수로 츌력 (각 요소, 키 값)
            return lists.map((unit, idx) => {
                return (
                    
                <StyledDiv key={idx} backgroundImage={unit.image} likeImage={'/images/like.svg'}>
                   
                    {/* 영화 이름으로 상세 페이지 이동 */}
                    <span className="title" onClick={()=> this.historyPush(unit.movieName)}>{unit.movieName}</span>

                    {/* 영화 장르를 showGenre 매소드로 호출 */}
                    <div className="genre">{showGenre(unit.genre)}</div>

                    {/* releaseDate가 null값이면 미개봉 출력, 아니면 날짜 출력 */}
                    <span className="sub">{unit.releaseDate === null ? '미개봉' : `${unit.releaseDate} 개봉`}</span>

                    {/* 날짜가 null이 아니면 관객 수 출력 */}
                    {unit.releaseDate !== null && (
                        <span className="sub">
                            {`누적 관객 수: ${unit.totalAudience}명 (${unit.grade}/10)`}
                        </span>
                    )}

                    {/* 메인카피를 convertEnterToLine 메소드로 호출 */}
                    <div className="sub-introduce">
                        {convertEnterToLine(unit.subIntro)}
                    </div>

                    {/* 좋아요 createRef 연결 */}
                    <div className="like-button">
                        <span ref={this.domConfettiRefs[idx]} on click={()=>{this.showParadise(idx);}} />
                    </div>
                </StyledDiv>
                )
            }
            )
        }

        return (
            // renderMovieList 메소드 호출해서 리스트 업
            <div>{renderMovieList(this.props.data)}</div>
        );
    }
 }


export default MovieList;