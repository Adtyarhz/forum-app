# TODO List for Forum App Enhancements

## Kriteria Utama 1: Automation Testing
- [ ] Install testing dependencies: Jest, React Testing Library, Cypress
- [ ] Add test scripts to package.json: npm test for unit/integration, npm run e2e for E2E
- [ ] Create unit tests for reducers:
  - [ ] Test authUserReducer: SET_AUTH_USER and UNSET_AUTH_USER
  - [ ] Test threadsReducer: RECEIVE_THREADS, ADD_THREAD, UP_VOTE_THREAD, DOWN_VOTE_THREAD, NEUTRALIZE_VOTE_THREAD
- [ ] Create unit tests for thunk functions:
  - [ ] Test asyncSetAuthUser: success and error cases
  - [ ] Test asyncAddThread: success and error cases
- [ ] Create unit tests for React components:
  - [ ] Test LoginInput: form submission
  - [ ] Test ThreadItem: rendering and interactions
- [ ] Create E2E test for login flow using Cypress

## Kriteria Utama 2: Deployment Aplikasi
- [ ] Set up GitHub Actions for CI: workflow file for running tests on push/PR
- [ ] Configure Vercel for CD: connect repo, set up deployment
- [ ] Protect master branch: require CI checks, PR reviews
- [ ] Test CI/CD: create PR to verify checks, merge to deploy

## Kriteria Utama 3: Memanfaatkan Salah Satu Ecosystem React
- [ ] Choose and integrate React Helmet for SEO management
- [ ] Add Helmet to pages for dynamic titles/meta

## Kriteria Utama 4: Mempertahankan Kriteria Submission Sebelumnya
- [ ] Ensure all previous functionalities remain intact
- [ ] Verify no bugs introduced
- [ ] Maintain architecture

## Followup Steps
- [ ] Run tests locally to ensure they pass
- [ ] Deploy to Vercel and verify URL
- [ ] Capture screenshots for submission
