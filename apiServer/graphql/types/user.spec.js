import { graphql } from 'graphql'
import { RootQuery } from '../schema'
import { setupTest } from '../../helpers/setupTest'
import { User } from '../../database/models'

beforeEach(async () => setupTest())
describe('user type', async () => {
  it('should be null when it doesnt exits', async () => {
    const query = `
      {
        user(username: "test", password: "test") {
          username
        }
      }
    `
    const result = await graphql(RootQuery, query, {}, {})
    const { data } = result

    expect(data.user).toEqual([])
  })
  it('should return the user if it exists', async () => {
    const userData = {
      username: 'mockUsername',
      password: 'mockPassword',
      email: 'mockEmail',
      monzouser: 'monzoUser'
    }
    const user = new User(userData)
    await user.save()

    const query = `
      {
        user(username: "${userData.username}", password: "${userData.password}") {
          username,
          password,
          email,
          monzouser
        }
      }`
    const result = await graphql(RootQuery, query, {}, {})
    const { data } = result

    expect(data.user).not.toBe(null)
    expect(data.user[0].username).toEqual(userData.username)
    expect(data.user[0].password).toEqual(userData.password)
    expect(data.user[0].email).toEqual(userData.email)
    expect(data.user[0].monzouser).toEqual(userData.monzouser)
  })
})
