'use strict'


require('dotenv').config()

const { mongoose, models: { User, Service, Booking } } = require('data')
const { expect } = require('chai')
const logic = require('.')
const moment = require('moment')


const { env: { DB_URL } } = process

describe('logic (style-booking)', () => {
  const serviceData = { name: 'lavado de pelo', duration: 30, price: 15 }
  const serviceData2 = { name: 'corte de pelo', duration: 60, price: 45 }

  before(() => mongoose.connect(DB_URL))

  beforeEach(() => Promise.all([User.remove(), Service.deleteMany(), Booking.deleteMany()]))

  describe('create a booking', () => {
    it('should succeed on correct data', () =>
      Promise.all([
        User.create({ name: 'John', surname: 'Doe', email: 'johndoe@mail.com', password: '123' }),
        Service.create(serviceData),
      ])
        .then(res => {

          const [{ _doc: { _id: idUser } }, { _doc: service1 }] = res
          debugger

          const serviceId = service1._id

          const date = new Date()

          const totalDuration = service1.duration

          const endDate = moment(date).add(totalDuration, 'minutes').toDate()

          return logic.placeBooking(idUser, serviceId, date, endDate)
            .then(() => {

              const booking = new Booking({
                idUser,
                serviceId,
                date,
                endDate
              })

              return booking.save()
                .then(booking => {
                  expect(booking._id).to.exist
                  expect(booking.services).to.exist
                  expect(booking.services.length).to.equal(2)

                  const { services: [serviceId1, serviceId2] } = booking

                  expect(serviceId1.toString()).to.equal(service1._id.toString())
                  expect(serviceId2.toString()).to.equal(service2._id.toString())

                  expect(booking.date.toString()).to.equal(date.toString())
                  expect(booking.endDate.toString()).to.equal(endDate.toString())
                })

            })


        })
    )
  })

  after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})