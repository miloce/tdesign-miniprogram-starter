import { findTemplate, monetizationConfig, records, templates, userProfile } from './data';

function ok(data) {
  return {
    code: 200,
    message: 'success',
    data,
  };
}

function okResponse(data) {
  return {
    code: 200,
    success: true,
    data: ok(data),
  };
}

function buildQuery(data = {}) {
  return Object.keys(data)
    .filter((key) => data[key] !== undefined && data[key] !== '')
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

function createLink(template, data, type) {
  const query = buildQuery(data);
  const baseUrl = type === 'final' ? template.finalUrl : template.previewUrl;
  return query ? `${baseUrl}?${query}` : baseUrl;
}

function appendQuery(url, key, value) {
  const joiner = url.includes('?') ? '&' : '?';
  return `${url}${joiner}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

export default [
  {
    path: '/code/config',
    data: ok(monetizationConfig),
  },
  {
    path: '/code/templates',
    data: ok({
      categories: ['全部', '表白', '祝福', '友情', '情感'],
      list: templates,
    }),
  },
  {
    path: '/code/template-detail',
    response(data = {}) {
      return okResponse(findTemplate(data.id));
    },
  },
  {
    path: '/code/create-preview',
    response(data = {}) {
      const template = findTemplate(data.templateId);
      return okResponse({
        previewUrl: createLink(template, data.form, 'preview'),
      });
    },
  },
  {
    path: '/code/generate',
    response(data = {}) {
      const template = findTemplate(data.templateId);
      const id = `R${Date.now()}`;
      return okResponse({
        id,
        title: template.title,
        link: appendQuery(createLink(template, data.form, 'final'), 'record', id),
      });
    },
  },
  {
    path: '/code/records',
    data: ok(records),
  },
  {
    path: '/code/profile',
    data: ok(userProfile),
  },
];
