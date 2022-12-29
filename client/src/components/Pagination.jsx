import { useState } from 'react';
import { PageWrapper, PageBtn } from '../styles/Styled';
import styled from 'styled-components';

const PageWrap = styled(PageWrapper)`
	min-width: 760px;
	margin: 1.5rem 0;
`;

// memo 지우: total(데이터 총 갯수), limit(한 페이지에 보여줄 갯수)
const Pagination = ({ total, limit, page, setPage }) => {
	const [btnActive, setBtnActive] = useState('');
	const numPages = Math.ceil(total / limit);

	const hadlePageBtn = (e, i) => {
		setPage(i + 1);
		setBtnActive(e.target.value);
	};

	return (
		<>
			<PageWrap>
				<PageBtn onClick={() => setPage(page - 1)} disabled={page === 1}>
					&lt;
				</PageBtn>
				{Array(numPages)
					.fill()
					.map((_, i) => (
						<PageBtn
							value={i}
							key={i + 1}
							className={i == btnActive ? 'active' : ''}
							onClick={(e) => hadlePageBtn(e, i)}
							aria-current={page === i + 1 ? 'page' : null}
						>
							{i + 1}
						</PageBtn>
					))}
				<PageBtn onClick={() => setPage(page + 1)} disabled={page === numPages}>
					&gt;
				</PageBtn>
			</PageWrap>
		</>
	);
};

export default Pagination;
