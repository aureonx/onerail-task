export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Server-node Exercise API',
    version: '1.0.0',
  },
  servers: [{ url: 'http://localhost:3000' }],
  tags: [
    { name: 'Users' },
    { name: 'Organizations' },
    { name: 'Orders' },
    { name: 'Auth' },
    { name: 'Health'},
  ],
  paths: {
    '/api/users': {
      get: {
        tags: ['Users'],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    page: { type: 'integer' },
                    limit: { type: 'integer' },
                    data: { type: 'array', items: { $ref: '#/components/schemas/UserDto' } },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Users'],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UserCreate' } } } },
        responses: { '201': { content: { 'application/json': { schema: { $ref: '#/components/schemas/UserDto' } } } } },
      },
    },

    '/api/users/{id}': {
      get: {
        tags: ['Users'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/UserDto' } } } },
          '404': {},
        },
      },
      put: {
        tags: ['Users'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UserUpdate' } } } },
        responses: {
          '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/UserDto' } } } },
          '404': {},
        },
      },
      delete: {
        tags: ['Users'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '204': {}, '404': {} },
      },
    },

    '/api/organizations': {
      get: {
        tags: ['Organizations'],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    page: { type: 'integer' },
                    limit: { type: 'integer' },
                    data: { type: 'array', items: { $ref: '#/components/schemas/OrganizationDto' } },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Organizations'],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/OrganizationCreate' } } } },
        responses: { '201': { content: { 'application/json': { schema: { $ref: '#/components/schemas/OrganizationDto' } } } } },
      },
    },

    '/api/organizations/{id}': {
      get: {
        tags: ['Organizations'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/OrganizationDto' } } } }, '404': {} },
      },
      put: {
        tags: ['Organizations'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/OrganizationUpdate' } } } },
        responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/OrganizationDto' } } } }, '404': {} },
      },
      delete: {
        tags: ['Organizations'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '204': {}, '400': {}, '404': {} },
      },
    },

    '/api/orders': {
      get: {
        tags: ['Orders'],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    page: { type: 'integer' },
                    limit: { type: 'integer' },
                    data: { type: 'array', items: { $ref: '#/components/schemas/OrderDto' } },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Orders'],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderCreate' } } } },
        responses: { '201': { content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderDto' } } } } },
      },
    },

    '/api/orders/{id}': {
      get: {
        tags: ['Orders'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderExtendedDto' } } } }, '404': {} },
      },
      put: {
        tags: ['Orders'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderUpdate' } } } },
        responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/OrderDto' } } } }, '404': {} },
      },
      delete: {
        tags: ['Orders'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { '204': {}, '404': {} },
      },
    },

    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        security: [],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } } },
        responses: { '200': { content: { 'application/json': { schema: { type: 'object', properties: { token: { type: 'string' } } } } } }, '401': {} },
      },
    },

    '/health': { get: { tags: ['Health'], security: [], responses: { '200': {} } } },
    '/readiness': { get: { tags: ['Health'], security: [], responses: { '200': {}, '503': {} } } },
  },
  components: {
    schemas: {
      UserDto: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          organizationId: { type: 'integer' },
          dateCreated: { type: 'string', format: 'date-time' },
        },
      },
      UserCreate: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'password', 'organizationId'],
        properties: { firstName: { type: 'string' }, lastName: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' }, organizationId: { type: 'integer' } },
      },
      UserUpdate: { type: 'object', properties: { firstName: { type: 'string' }, lastName: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' }, organizationId: { type: 'integer' } } },

      OrganizationDto: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, industry: { type: 'string' }, dateFounded: { type: 'string', format: 'date' } } },
      OrganizationCreate: { type: 'object', required: ['name', 'industry', 'dateFounded'], properties: { name: { type: 'string' }, industry: { type: 'string' }, dateFounded: { type: 'string', format: 'date' } } },
      OrganizationUpdate: { type: 'object', properties: { name: { type: 'string' }, industry: { type: 'string' }, dateFounded: { type: 'string', format: 'date' } } },

      OrderDto: { type: 'object', properties: { id: { type: 'integer' }, orderDate: { type: 'string', format: 'date-time' }, totalAmount: { type: 'number' }, userId: { type: 'integer' }, organizationId: { type: 'integer' } } },
      OrderCreate: { type: 'object', required: ['orderDate', 'totalAmount', 'userId', 'organizationId'], properties: { orderDate: { type: 'string', format: 'date-time' }, totalAmount: { type: 'number' }, userId: { type: 'integer' }, organizationId: { type: 'integer' } } },
      OrderUpdate: { type: 'object', properties: { orderDate: { type: 'string', format: 'date-time' }, totalAmount: { type: 'number' }, userId: { type: 'integer' }, organizationId: { type: 'integer' } } },
      OrderExtendedDto: {
        allOf: [
          { $ref: '#/components/schemas/OrderDto' },
          {
            type: 'object',
            properties: {
              user: { $ref: '#/components/schemas/UserDto' },
              organization: { $ref: '#/components/schemas/OrganizationDto' },
            },
          },
        ],
      },

      LoginRequest: { type: 'object', required: ['email', 'password'], properties: { email: { type: 'string' }, password: { type: 'string' } } },
    },
    securitySchemes: {
      bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
    }
  },
  security: [{ bearerAuth: [] }],
};