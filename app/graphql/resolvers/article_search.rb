require 'search_object/plugin/graphql'

class Resolvers::ArticleSearch
    include SearchObject.module(:graphql)

    scope { Article.all }

    type types[Types::ArticleType]

    class ArticleFilter < ::Types::BaseInputObject
        argument :OR, [self], required: false
        argument :author_contains, String, required: false
        argument :title_contains, String, required: false
        argument :url_contains, String, required: false
        argument :description_contains, String, required: false
    end

    option :category, type: types.String, with: :filter_category
    option(:first, type: types.Int) { |scope, value| scope.limit(value) }
    option(:skip, type: types.Int) { |scope, value| scope.offset(value) }
    option :search, type: ArticleFilter, with: :apply_filter

    def filter_category(scope, value) 
        if value.blank?
            scope.group(:title).order(published_at: :desc)
        else
            scope.where(category: value).order(published_at: :desc)
        end
    end
    
    def apply_filter(scope, value)
        branches = normalize_filters(value).reduce { |a, b| a.or(b) }
        scope.merge branches
    end

    def normalize_filters(value, branches = [])
        scope = Article.all
        scope = scope.where("author like ?", "%#{value[:author_contains]}%") if value[:author_contains]
        scope = scope.where("title like ?", "%#{value[:title_contains]}%") if value[:title_contains]
        scope = scope.where("url like ?", "%#{value[:url_contains]}%") if value[:url_contains]
        scope = scope.where("description like ?", "%#{value[:description_contains]}%") if value[:description_contains]
    
        branches << scope
    
        value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?
    
        branches
    end

end