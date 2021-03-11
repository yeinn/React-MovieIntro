import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import MovieList from './components/movie-list/MovieList'
import MovieDetail from './components/movie-detail/MovieDetail'
import { data } from './data'
import styled from 'styled-components';

const MainDiv = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`

class App extends Component {
  state = {
    movieData: data,
    headerTitle: '영화 소개 프로젝트',
    currentMovieData: null
  }
  

    // 영화 한개의 정보를 업데이트 하는 메소드
    getDetailMobieInfo =()=> {
      // 현재 url pathname을 문자 '/' 기준으로 나눔
      const currentRoute = this.props.location.pathname.split('/');
      //url의 영화이름과 state의 영화 이름 중 같은 이름이 있는 지 체크
      const ifExistMovieName = this.state.movieNames.filter(movie=>movie.name===currentRoute[1]);
      
      //이름이 같으면 영화 데이터 업데이트, 없으면 패스
      if (ifExistMovieName===1) {
        this.setState({
          currentMovieData: this.state.movieData[ifExistMovieName]
        })
      }
      else {
        this.setState({currentMovieData:null
        })
      }
    }

    //pathname이 바뀔 때마다 정보 없데이트 메소드 실행
    componentDidUpdate(prevProps, nextState){
      //무한루프 방지를 위한, 이전 라우트와 현재 라우트 비교 
      if(prevProps.location.pathname!==this.props.location.path){
        this.getDetailMobieInfo();
      }
    }

    //state 정보 업데이트
    componentDidMount(){
      this.getDetailMobieInfo();
    }

 render(){
  return (
    <MainDiv>
      <Header title={this.state.headerTitle}/>
      <Switch>
        <Route path="/:movieName" exact={true} render={()=><MovieDetail movieData={this.state.currentMovieData}/>}/>
        <Route path="/" exact={true} render={()=> <MovieList data={this.state.movieData} /> } />
      </Switch>
      </MainDiv>
  );
}
}

export default withRouter(App);
