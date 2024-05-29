# PENTA - KILL

## 프로젝트 개요

'Pentakill(펜타킬)' 프로젝트 즉 리그오브레전드의 주요 대회(롤드컵, MSI 등)에서의 경기를 분석하여 실시간으로 각 팀과 선수의 챔피언 선택 및 밴에 따른 승률 변동을 예측합니다. 또한, 선수의 개인 능력을 분석하여 특정 챔피언을 선택했을 때의 승률 변화를 예측하고, 팀 간 상성을 분석하여 어느 팀이 어떤 조건에서 유리한지를 예측하여 분석 결과를 효과적으로 확인 할 수 있게 웹으로 시각화하는 프로젝트 입니다.

## 팀원

<table>
    <thead>
        <tr>
            <th style="text-align: center">프론트엔드</th>
            <th style="text-align: center">프론트엔드</th>
            <th style="text-align: center">백엔드</th>
            <th style="text-align: center">데이터사이언스</th>
            <th style="text-align: center">데이터사이언스</th>
            <th style="text-align: center">데이터사이언스</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/littleduck1219"><img src="https://avatars.githubusercontent.com/u/107936957?v=4" alt="박경덕" style="width: 400px;"></a></td>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/solightnsalt"><img src="https://avatars.githubusercontent.com/u/108651896?v=4" alt="김다솔" style="width: 400px;"></a></td>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/kss123456789"><img src="https://avatars.githubusercontent.com/u/85011923?v=4" alt="김승수" style="width: 400px;"></a></td>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/zaqwsx2003"><img src="https://avatars.githubusercontent.com/u/47521211?v=4" alt="전준혁" style="width: 400px; height: auto;"></a></td>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href=""><img src="https://avatars.githubusercontent.com/u/83434398?v=4" alt="최태혁" style="width: 400px;"></a></td>
            <td align="center"><a target="_blank" rel="noopener noreferrer nofollow" href="https://github.com/RoomCloud"><img src="https://avatars.githubusercontent.com/u/169641401?v=4" alt="차승주" style="width: 400px;"></a></td>
        </tr>
        <tr>
            <td align="center"><a href="https://github.com/littleduck1219">박경덕</a></td>
            <td align="center"><a href="https://github.com/solightnsalt">김다솔</a></td>
            <td align="center"><a href="https://github.com/kss123456789">김승수</a></td>
            <td align="center"><a href="https://github.com/zaqwsx2003">전준혁</a></td>
            <td align="center"><a href="https://github.com/chlxogur">최태혁</a></td>
            <td align="center"><a href="">차승주</a></td>
        </tr>
    </tbody>
</table>

## Front-end

### 기술

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/><img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/><img src="https://img.shields.io/badge/TanStack Query-FF4154?style=flat-square&logo=reactquery&logoColor=white"/><img src="https://img.shields.io/badge/reacthookform-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/><img src="https://img.shields.io/badge/zod-3E67B1?style=flat-square&logo=zod&logoColor=white"/>

### Next.js

**1. 기술적 배경**<br>
<br>
Next.js는 React 기반의 프레임워크로, React와 완벽하게 통합되어 서버 사이드 렌더링(SSR)과 클라이언트 사이드 렌더링(CSR)을 효율적으로 전환할 수 있습니다. 이를 통해 다양한 렌더링 전략을 유연하게 사용할 수 있습니다.

<br>

**2. 주요 장점**

-   **SEO 최적화:** 서버 사이드 렌더링을 통해 검색 엔진 최적화(SEO)에 유리합니다. 서버에서 HTML을 생성하여 클라이언트에 전달함으로써 검색 엔진이 페이지를 쉽게 인덱싱할 수 있습니다.
-   **코드 스플리팅:** Next.js는 자동 코드 스플리팅을 지원합니다. 이는 자바스크립트 코드를 하나의 큰 묶음으로 만드는 대신, 페이지 단위로 분리하여 필요한 코드만 로드합니다. 이를 통해 초기 로드 시간을 단축하고, 브라우저의 파싱 부담을 줄일 수 있습니다.
    프로젝트 규모가 작을 때는 코드 번들링이 큰 문제가 되지 않지만, 규모가 커질수록 번들 크기가 커져 초기 로드 속도가 느려질 수 있습니다. 이는 브라우저가 파싱해야 하는 정보량이 많아지기 때문입니다.
    Next.js는 폴더 시스템 라우팅을 기반으로 독립적인 번들로 코드를 처리합니다. 각 페이지에 필요한 코드만 로드하여 성능을 최적화하고, 불필요한 코드가 로드되지 않도록 합니다.
-   **파일 시스템 기반 라우팅:** Next.js는 폴더 구조를 기반으로 라우팅을 자동으로 설정합니다. 이는 개발자가 라우팅을 수동으로 설정할 필요 없이, 폴더와 파일 이름만으로 쉽게 라우팅을 관리할 수 있게 합니다.

**3. 정리**

-   **초기 로드 시간 단축:** 필요한 페이지의 코드만 로드하여 초기 로드 시간을 단축합니다.
-   **메모리 효율성 향상:** 각 페이지의 코드만 메모리에 로드되어 메모리 사용을 최적화합니다.
-   **페이지 전환 속도:** 페이지 이동 시 필요한 코드만 추가로 로드하여 빠른 응답성을 제공합니다.

### TanStack Query

**1. 기술적 배경**
TanStack Query는 React 애플리케이션에서 데이터 페칭, 캐싱, 동기화, 그리고 업데이트를 효율적으로 관리하기 위한 라이브러리입니다. 이 라이브러리는 서버 상태를 관리하고, 클라이언트와 서버 간의 데이터 일관성을 유지하는 데 중점을 둡니다.

**2. 주요 장점**

-   **자동 캐싱:** TanStack Query는 자동으로 데이터 캐싱을 수행하여, 동일한 데이터를 여러 번 요청하지 않도록 합니다. 이는 네트워크 요청 수를 줄여 성능을 최적화합니다.
-   **리페칭:** 데이터가 변경되거나 오래된 경우 자동으로 최신 데이터를 다시 가져와서 UI를 최신 상태로 유지합니다.
-   **병렬 및 배치 처리:** 여러 쿼리를 병렬로 처리하거나, 배치 처리하여 성능을 극대화할 수 있습니다.
-   **뛰어난 개발자 경험:** 사용하기 쉬운 API와 풍부한 기능으로 개발자 경험을 향상시킵니다.

**3. 정리**

-   **자동 캐싱 및 리페칭:** 데이터가 변경되면 자동으로 최신 상태를 유지하며, 불필요한 네트워크 요청을 줄입니다.
-   **병렬 요청 및 중복 제거:** 여러 요청을 병렬로 처리하고 중복된 요청을 제거하여 성능을 최적화합니다.
-   **메모리 효율성:** 캐시된 데이터를 재사용하여 메모리 사용을 최적화합니다.

### tailwind

### Zustand

### React-Hook-Form

### Zod
